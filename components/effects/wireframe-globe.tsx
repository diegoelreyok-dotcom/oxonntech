'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function WireframeGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Respect prefers-reduced-motion ──
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // ── Main sphere wireframe ──
    const sphereGeo = new THREE.IcosahedronGeometry(2.2, 3);
    const wireframe = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      opacity: 0.28,
      transparent: true,
    });
    const wireLines = new THREE.LineSegments(wireframe, wireMat);
    scene.add(wireLines);

    // ── Vertex dots ──
    const dotGeo = new THREE.BufferGeometry();
    const positions = sphereGeo.attributes.position;
    const dotPositions = new Float32Array(positions.count * 3);
    for (let i = 0; i < positions.count; i++) {
      dotPositions[i * 3] = positions.getX(i);
      dotPositions[i * 3 + 1] = positions.getY(i);
      dotPositions[i * 3 + 2] = positions.getZ(i);
    }
    dotGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(dotPositions, 3)
    );
    const dotMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // ── Floating particles ──
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.3 + Math.random() * 0.9;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
      pVelocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
      });
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(pPositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Outer wireframe layer ──
    const outerGeo = new THREE.IcosahedronGeometry(2.45, 2);
    const outerWire = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      opacity: 0.09,
      transparent: true,
    });
    const outerLines = new THREE.LineSegments(outerWire, outerMat);
    scene.add(outerLines);

    // ── If reduced-motion: render single static frame ──
    if (motionQuery.matches) {
      renderer.render(scene, camera);
      return () => {
        renderer.dispose();
        sphereGeo.dispose();
        wireframe.dispose();
        wireMat.dispose();
        dotGeo.dispose();
        dotMat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        outerGeo.dispose();
        outerWire.dispose();
        outerMat.dispose();
      };
    }

    // ── Animation loop ──
    function animate() {
      rafRef.current = requestAnimationFrame(animate);

      wireLines.rotation.y += 0.002;
      wireLines.rotation.x += 0.0005;
      dots.rotation.y += 0.002;
      dots.rotation.x += 0.0005;
      outerLines.rotation.y -= 0.001;
      outerLines.rotation.x += 0.0003;

      // Animate floating particles
      const pPos = particles.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3] += pVelocities[i].x;
        pPos[i * 3 + 1] += pVelocities[i].y;
        pPos[i * 3 + 2] += pVelocities[i].z;
        const dist = Math.sqrt(
          pPos[i * 3] ** 2 + pPos[i * 3 + 1] ** 2 + pPos[i * 3 + 2] ** 2
        );
        if (dist > 3.5 || dist < 2.1) {
          pVelocities[i].x *= -1;
          pVelocities[i].y *= -1;
          pVelocities[i].z *= -1;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    }
    animate();

    // ── Pause when tab not visible ──
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ── Resize ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      wireframe.dispose();
      wireMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      outerGeo.dispose();
      outerWire.dispose();
      outerMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}

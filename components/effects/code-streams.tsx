'use client';

import { useEffect, useRef, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════════
// Code Streams Animation
// Renders a grid of pipe characters with animated horizontal lines
// streaming across at different speeds — inspired by jet.framer.website
// ═══════════════════════════════════════════════════════════════════

interface StreamLine {
  row: number;
  x: number;
  speed: number;
  length: number;
  opacity: number;
  direction: 1 | -1;
  color: string;
}

interface CodeStreamsProps {
  /** Number of grid columns */
  cols?: number;
  /** Number of grid rows */
  rows?: number;
  /** Base color for accent lines (CSS color) */
  accentColor?: string;
  /** Secondary color for some lines */
  secondaryColor?: string;
  /** Grid character opacity (0-1) */
  gridOpacity?: number;
  /** Number of animated stream lines */
  streamCount?: number;
  /** Animation speed multiplier */
  speedMultiplier?: number;
  /** Additional CSS class */
  className?: string;
}

// Characters used for the background grid
const GRID_CHARS = ['|', '¦', '┊', '│', '╎'];
// Characters for the streaming lines
const STREAM_CHARS = ['─', '━', '═', '—', '──', '━━', '───', '━━━', '────', '═══'];

export function CodeStreams({
  cols = 80,
  rows = 20,
  accentColor = '#00E5FF',
  secondaryColor = '#00E5FF',
  gridOpacity = 0.08,
  streamCount = 18,
  speedMultiplier = 1,
  className = '',
}: CodeStreamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    streams: StreamLine[];
    rafId: number | null;
    disposed: boolean;
    resizeObserver: ResizeObserver | null;
  } | null>(null);

  // Parse hex color to rgba
  const parseColor = useMemo(() => {
    return (hex: string, alpha: number): string => {
      const h = hex.replace('#', '');
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize stream lines
    const createStream = (canvasWidth: number): StreamLine => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const row = Math.floor(Math.random() * rows);
      return {
        row,
        x: direction === 1 ? -Math.random() * canvasWidth * 0.5 : canvasWidth + Math.random() * canvasWidth * 0.5,
        speed: (0.5 + Math.random() * 2.5) * speedMultiplier,
        length: 60 + Math.random() * 250,
        opacity: 0.15 + Math.random() * 0.6,
        direction,
        color: Math.random() > 0.3 ? accentColor : secondaryColor,
      };
    };

    const resetStream = (stream: StreamLine, canvasWidth: number): void => {
      stream.row = Math.floor(Math.random() * rows);
      stream.direction = Math.random() > 0.5 ? 1 : -1;
      stream.x = stream.direction === 1 ? -stream.length - Math.random() * 200 : canvasWidth + Math.random() * 200;
      stream.speed = (0.5 + Math.random() * 2.5) * speedMultiplier;
      stream.length = 60 + Math.random() * 250;
      stream.opacity = 0.15 + Math.random() * 0.6;
      stream.color = Math.random() > 0.3 ? accentColor : secondaryColor;
    };

    // Resize handler
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    handleResize();

    // Create initial streams
    const streams: StreamLine[] = [];
    for (let i = 0; i < streamCount; i++) {
      const s = createStream(canvas.getBoundingClientRect().width);
      // Spread initial positions
      s.x = s.direction === 1
        ? -s.length + Math.random() * (canvas.getBoundingClientRect().width + s.length)
        : Math.random() * (canvas.getBoundingClientRect().width + s.length);
      streams.push(s);
    }

    const state = {
      streams,
      rafId: null as number | null,
      disposed: false,
      resizeObserver: observer,
    };
    stateRef.current = state;

    // Respect reduced-motion: render static grid only (no animated streams)
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render
    const render = () => {
      if (state.disposed) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const cellW = w / cols;
      const cellH = h / rows;
      const fontSize = Math.max(10, Math.min(cellH * 0.7, 14));

      // ── Draw background grid ──
      ctx.font = `${fontSize}px "Geist Mono", "SF Mono", "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const charIdx = (row * 7 + col * 3) % GRID_CHARS.length;
          const char = GRID_CHARS[charIdx];
          const x = col * cellW + cellW / 2;
          const y = row * cellH + cellH / 2;

          // Slight variation in opacity for organic feel
          const variation = 0.6 + 0.4 * Math.sin(col * 0.3 + row * 0.7);
          ctx.fillStyle = `rgba(255,255,255,${gridOpacity * variation})`;
          ctx.fillText(char, x, y);
        }
      }

      // ── Draw stream lines ──
      for (const stream of state.streams) {
        const y = stream.row * cellH + cellH / 2;

        // Create gradient for the stream line
        const gradStart = stream.direction === 1 ? stream.x : stream.x + stream.length;
        const gradEnd = stream.direction === 1 ? stream.x + stream.length : stream.x;

        // Only draw if visible
        if (gradEnd < -50 || gradStart > w + 50) {
          // Reset if off screen
          if ((stream.direction === 1 && stream.x > w + 50) ||
              (stream.direction === -1 && stream.x + stream.length < -50)) {
            resetStream(stream, w);
          }
          stream.x += stream.speed * stream.direction;
          continue;
        }

        const grad = ctx.createLinearGradient(stream.x, 0, stream.x + stream.length, 0);
        const baseColor = parseColor(stream.color, stream.opacity);
        const fadeColor = parseColor(stream.color, 0);

        if (stream.direction === 1) {
          grad.addColorStop(0, fadeColor);
          grad.addColorStop(0.15, baseColor);
          grad.addColorStop(0.85, baseColor);
          grad.addColorStop(1, fadeColor);
        } else {
          grad.addColorStop(0, fadeColor);
          grad.addColorStop(0.15, baseColor);
          grad.addColorStop(0.85, baseColor);
          grad.addColorStop(1, fadeColor);
        }

        // Draw dashed line
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1.5, cellH * 0.12);
        ctx.setLineDash([cellW * 0.6, cellW * 0.35]);
        ctx.beginPath();
        ctx.moveTo(stream.x, y);
        ctx.lineTo(stream.x + stream.length, y);
        ctx.stroke();

        // Draw brighter core for some lines
        if (stream.opacity > 0.35) {
          ctx.strokeStyle = parseColor(stream.color, stream.opacity * 0.4);
          ctx.lineWidth = Math.max(3, cellH * 0.3);
          ctx.setLineDash([]);
          ctx.globalCompositeOperation = 'lighter';
          ctx.filter = `blur(${Math.max(2, cellH * 0.15)}px)`;
          ctx.beginPath();
          ctx.moveTo(stream.x, y);
          ctx.lineTo(stream.x + stream.length, y);
          ctx.stroke();
          ctx.filter = 'none';
          ctx.globalCompositeOperation = 'source-over';
        }

        ctx.restore();

        // Move stream
        stream.x += stream.speed * stream.direction;
      }

      // Stop after first frame if user prefers reduced motion
      if (!prefersReducedMotion) {
        state.rafId = requestAnimationFrame(render);
      }
    };

    state.rafId = requestAnimationFrame(render);

    return () => {
      state.disposed = true;
      if (state.rafId !== null) cancelAnimationFrame(state.rafId);
      observer.disconnect();
    };
  }, [cols, rows, accentColor, secondaryColor, gridOpacity, streamCount, speedMultiplier, parseColor]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}

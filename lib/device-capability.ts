'use client';

export type Capability = '3d-full' | '3d-reduced' | '3d-static' | 'fallback';

export function get3DCapability(): Capability {
  if (typeof window === 'undefined') return 'fallback';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) return 'fallback';

  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'fallback';

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency <= 4
    : false;

  if (isMobile && isLowEnd) return '3d-static';
  if (isMobile) return '3d-reduced';
  if (gl instanceof WebGL2RenderingContext) return '3d-full';
  return '3d-reduced';
}

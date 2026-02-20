'use client';

const RING_COUNT = 8;
const BASE_SIZE = 250;
const SIZE_STEP = 50;

export function CyclingWave({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 720,
        height: 720,
        zIndex: 1,
        pointerEvents: 'none',
        perspective: 800,
      }}
    >
      {Array.from({ length: RING_COUNT }, (_, i) => {
        const size = BASE_SIZE + i * SIZE_STEP;
        return (
          <div
            key={i}
            className="cycling-wave-ring"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: size,
              height: size,
              border: '1.5px solid rgba(0, 229, 255, 0.08)',
              borderRadius: '50%',
              transformStyle: 'preserve-3d',
              animationDelay: `${i * 0.3}s`,
              opacity: 0.15 - i * 0.012,
            }}
          />
        );
      })}
    </div>
  );
}

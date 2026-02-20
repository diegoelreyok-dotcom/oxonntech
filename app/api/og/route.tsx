import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get('title') ?? 'OXONN Technologies';
  const subtitle = searchParams.get('subtitle') ?? 'Quantitative Intelligence';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '40px',
            right: '60px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '2px solid rgba(0, 229, 255, 0.2)',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            fontWeight: 700,
            color: '#00E5FF',
            letterSpacing: '0.2em',
          }}
        >
          OXONN
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: 1,
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '52px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: '#888888',
              marginTop: '16px',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '18px',
              color: '#555555',
            }}
          >
            oxonn-tech.com
          </div>

          <div
            style={{
              display: 'flex',
              width: '200px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #00E5FF)',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

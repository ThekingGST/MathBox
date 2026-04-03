'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          background: '#06070a',
          color: '#f8fafc',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            maxWidth: '480px',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>💥</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Something went wrong
          </h1>
          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            {error?.message ?? 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 2rem',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '0.75rem',
              color: '#a5b4fc',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

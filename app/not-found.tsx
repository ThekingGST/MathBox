import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Mathbox',
};

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '3rem 2rem',
        gap: '1.5rem',
      }}
    >
      <p
        style={{
          fontSize: '8rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #a5b4fc, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        404
      </p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
        This page doesn&apos;t exist
      </h1>
      <p style={{ color: '#94a3b8', maxWidth: '360px', lineHeight: 1.6, fontSize: '0.9rem' }}>
        The lesson or route you&apos;re looking for hasn&apos;t been created yet, or the URL might be wrong.
      </p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 2rem',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '0.75rem',
          color: '#a5b4fc',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          marginTop: '0.5rem',
        }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}

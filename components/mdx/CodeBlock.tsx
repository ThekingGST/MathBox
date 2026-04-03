import React from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
}

/**
 * Code block for MDX content.
 * Language is extracted from the className (e.g. "language-python").
 * Styled for the Math-Indigo theme.
 * Phase 3 note: Swap `pre/code` for a full syntax highlighter (e.g. Shiki)
 * once the playground is wired up.
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const language = className?.replace('language-', '') ?? 'text';

  return (
    <div
      style={{
        margin: '1.75rem 0',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#6366f1',
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
          }}
        >
          {language}
        </span>
        {/* Decorative dots */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
            <div
              key={c}
              style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }}
            />
          ))}
        </div>
      </div>

      <pre
        style={{
          margin: 0,
          padding: '1.25rem 1.25rem',
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          fontFamily: 'var(--font-jetbrains-mono, monospace)',
          color: '#e2e8f0',
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

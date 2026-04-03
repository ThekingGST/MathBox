import React from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'caution';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_CONFIG: Record<
  CalloutType,
  { icon: string; color: string; bg: string; border: string }
> = {
  info: {
    icon: '💡',
    color: '#93c5fd',
    bg: 'rgba(59, 130, 246, 0.06)',
    border: 'rgba(59, 130, 246, 0.2)',
  },
  tip: {
    icon: '✨',
    color: '#86efac',
    bg: 'rgba(34, 197, 94, 0.06)',
    border: 'rgba(34, 197, 94, 0.2)',
  },
  warning: {
    icon: '⚠️',
    color: '#fcd34d',
    bg: 'rgba(245, 158, 11, 0.06)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  caution: {
    icon: '🚨',
    color: '#fca5a5',
    bg: 'rgba(239, 68, 68, 0.06)',
    border: 'rgba(239, 68, 68, 0.2)',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const cfg = CALLOUT_CONFIG[type];

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: '0.875rem',
        padding: '1rem 1.25rem',
        margin: '1.75rem 0',
        display: 'flex',
        gap: '0.875rem',
      }}
    >
      <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>
        {cfg.icon}
      </span>
      <div>
        {title && (
          <p
            style={{
              color: cfg.color,
              fontWeight: 700,
              fontSize: '0.875rem',
              marginBottom: '0.375rem',
            }}
          >
            {title}
          </p>
        )}
        <div style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  vizName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class VizErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[VizErrorBoundary] Visualization "${this.props.vizName}" crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <VizErrorFallback error={this.state.error} vizName={this.props.vizName} />;
    }
    return this.props.children;
  }
}

interface VizErrorFallbackProps {
  error?: Error;
  vizName?: string;
  onRetry?: () => void;
}

export function VizErrorFallback({ error, vizName, onRetry }: VizErrorFallbackProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        padding: '2rem',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '1rem',
        gap: '1rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '2rem' }}>⚠️</div>
      <h3 style={{ color: '#fca5a5', fontWeight: 700, fontSize: '1rem' }}>
        {vizName ? `"${vizName}" could not render` : 'Visualization failed to load'}
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.8rem', maxWidth: '320px' }}>
        {error?.message ?? 'An unexpected error occurred in the 3D scene. Try refreshing.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '0.5rem',
            color: '#a5b4fc',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

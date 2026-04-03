'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PlaygroundErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[PlaygroundErrorBoundary] Playground crashed:', error, info);
  }

  handleReset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            padding: '2rem',
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '1rem',
            gap: '0.75rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '1.75rem' }}>🐍</div>
          <h3 style={{ color: '#fcd34d', fontWeight: 700, fontSize: '1rem' }}>
            Playground failed to initialize
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', maxWidth: '340px' }}>
            {this.state.error?.message ?? 'The Python playground encountered an error. Pyodide may be unavailable in this browser.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '0.5rem 1.25rem',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '0.5rem',
              color: '#fcd34d',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

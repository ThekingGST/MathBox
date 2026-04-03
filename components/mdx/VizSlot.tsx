'use client';

import React, { Suspense, lazy } from 'react';

interface VizSlotProps {
  /** The visualization component name (must match registry key) */
  name: string;
  /** Additional props passed to the visualization */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Lazy-loading slot for embedding Three.js visualizations inside MDX lessons.
 * Visualizations are dynamically imported so they don't block SSR.
 *
 * Usage in MDX:
 *   <VizSlot name="VectorAddition" vectorA={[1,2,3]} vectorB={[2,1,0]} />
 */
export function VizSlot({ name, ...props }: VizSlotProps) {
  let VisualizationComponent: React.ComponentType<Record<string, unknown>> | null = null;

  try {
    // Dynamic registry — add new visualizations here as they are built
    const registry: Record<string, React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>> = {
      // Phase 3 — Linear Algebra
      // VectorAddition: lazy(() => import('@/components/visualizations/3d/VectorAddition')),
    };

    VisualizationComponent = registry[name] ?? null;
  } catch {
    // Registry lookup failed
  }

  if (!VisualizationComponent) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          background: 'rgba(99,102,241,0.04)',
          border: '1px dashed rgba(99,102,241,0.3)',
          borderRadius: '1rem',
          margin: '2rem 0',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ fontSize: '2rem' }}>🎮</div>
        <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.875rem' }}>
          Visualization: <code style={{ fontFamily: 'monospace' }}>{name}</code>
        </p>
        <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Coming in Phase 3</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '300px',
              borderRadius: '1rem',
              background: 'rgba(99,102,241,0.04)',
              border: '1px solid rgba(99,102,241,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6366f1',
              fontSize: '0.875rem',
            }}
          >
            Loading visualization…
          </div>
        }
      >
        <VisualizationComponent {...props} />
      </Suspense>
    </div>
  );
}

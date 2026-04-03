'use client';

import React from 'react';

// AppProviders wraps all client-side global context.
// This is intentionally minimal — Zustand stores are accessed directly,
// so no React Context providers are needed for state.
// Add any future client providers (theme, analytics, etc.) here.

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>;
}

'use client';

import React, { useEffect, useState } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';

interface ProgressHydrationGateProps {
  children: React.ReactNode;
  // Optional skeleton shown while hydrating
  fallback?: React.ReactNode;
}

/**
 * Waits for the Zustand progress store to rehydrate from localStorage
 * before rendering children. Prevents a flash of "all lessons locked"
 * on first render, which would occur if the store state is read before
 * localStorage has been parsed.
 */
export function ProgressHydrationGate({
  children,
  fallback,
}: ProgressHydrationGateProps) {
  const isHydrated = useProgressStore((s) => s.isHydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isHydrated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

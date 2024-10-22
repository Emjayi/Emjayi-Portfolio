'use client';
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect } from 'react';
import Lenis from 'lenis';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

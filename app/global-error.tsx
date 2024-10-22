'use client';
import Link from 'next/link';
import Particles from '@/app/components/particles';
import { ThemeProvider } from './theme-provider';
import { HoverBorderGradient } from '@/app/components/ui/Hover-Border-Gradient';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="grid min-h-screen place-items-center px-6 bg-black py-24 sm:py-32 lg:px-8">
        <Particles className="absolute inset-0" quantity={90} staticity={190} />
        <div className="text-center z-10">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-200 sm:text-5xl">
            ERROR {`${error}`}!
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-300">
            Something Bad Happened!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <HoverBorderGradient
              onClick={() => reset()}
              className="text-md bg-black py-2 px-4 inline"
            >
              <p className="">Back to Home</p>
            </HoverBorderGradient>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

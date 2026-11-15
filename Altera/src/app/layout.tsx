import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'ALTERA — Become More Than One Possibility',
  description: 'A premium global AI-powered personal intelligence and future exploration platform. Second Self companion and Future You trajectory simulator.',
  keywords: ['personal intelligence', 'future modeling', 'decision architecture', 'second self', 'ai companion', 'life paths'],
  authors: [{ name: 'Altera Systems' }],
  openGraph: {
    title: 'ALTERA — Become More Than One Possibility',
    description: 'Personal intelligence and future exploration platform.',
    siteName: 'Altera',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#04060a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="bg-altera-950 text-slate-100 selection:bg-violet-accent selection:text-white antialiased font-sans">
        <AuthProvider>
          <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
            {/* Ambient Background subtle lights */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-violet-600/[0.06] rounded-full blur-[140px]" />
              <div className="absolute top-[35%] -left-[15%] w-[600px] h-[600px] bg-ice-accent/[0.035] rounded-full blur-[150px]" />
              <div className="absolute bottom-[5%] -right-[10%] w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[130px]" />
              <div className="absolute inset-0 ambient-grid opacity-35" />
            </div>

            <div className="relative z-10 flex flex-col flex-1">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

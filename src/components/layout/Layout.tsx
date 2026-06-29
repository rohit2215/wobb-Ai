import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { SelectedListDrawer } from "@/components/influencer/SelectedListDrawer";
import { BackgroundEffects } from "@/components/common/BackgroundEffects";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedProfiles = useInfluencerStore((state) => state.selectedProfiles);

  return (
    <div
      className="relative bg-transparent w-full"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dynamic Floating Particles & Sine Waves Background */}
      <BackgroundEffects />

      {/* Ambient background glows */}
      <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/60 transition-colors">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Wobb<span className="text-indigo-600">.ai</span>
            </span>
          </Link>

          <button
            id="my-list-trigger"
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 transition-all font-semibold text-sm cursor-pointer shadow-sm bg-white"
          >
            <svg
              className="w-4.5 h-4.5 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            My List
            {selectedProfiles.length > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-indigo-600 text-white font-bold text-xs rounded-full shadow-sm">
                {selectedProfiles.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Page Container - pb-24 padding-bottom prevents overlapping the fixed footer */}
      <main
        className="max-w-5xl mx-auto w-full px-4 pt-8 pb-24 relative z-10"
        style={{
          flex: "1 0 auto",
        }}
      >
        {title && (
          <div className="mb-6 text-left border-b border-slate-200 pb-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>
          </div>
        )}
        {children}
      </main>

      {/* Fixed Footer pinned to the viewport bottom */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 py-4 bg-white/85 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            Made with <span className="text-red-500">❤️</span> in India
          </div>
          <div>
            © 2026 Wobb. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Selected Drawer */}
      <SelectedListDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

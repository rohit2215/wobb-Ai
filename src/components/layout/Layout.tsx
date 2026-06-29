import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { SelectedListDrawer } from "@/components/influencer/SelectedListDrawer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedProfiles = useInfluencerStore((state) => state.selectedProfiles);

  return (
    <div className="p-4 min-h-screen max-w-5xl mx-auto">
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl font-bold text-gray-900 mt-2">{title}</h1>}
        </div>
        
        {/* Selection Drawer Trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 transition-colors font-medium text-sm cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          My List
          {selectedProfiles.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {selectedProfiles.length}
            </span>
          )}
        </button>
      </header>

      <main>{children}</main>

      {/* Selected List Sidebar Drawer */}
      <SelectedListDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

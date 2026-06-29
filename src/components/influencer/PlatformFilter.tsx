import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  // Brand color utilities for platform selections
  const getPlatformStyles = (p: Platform, isActive: boolean) => {
    if (!isActive) {
      return "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300";
    }
    switch (p) {
      case "instagram":
        return "bg-pink-500/10 text-pink-700 border-pink-300 font-bold shadow-sm";
      case "youtube":
        return "bg-red-500/10 text-red-700 border-red-300 font-bold shadow-sm";
      case "tiktok":
        return "bg-slate-900/10 text-slate-900 border-slate-400 font-bold shadow-sm";
      default:
        return "bg-indigo-600 text-white border-indigo-600";
    }
  };

  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case "instagram":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        );
      case "tiktok":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 mb-6">
      {/* Platform Toggle Chips */}
      <div className="flex gap-2 justify-center">
        {PLATFORMS.map((p) => {
          const isActive = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-xs transition-all duration-200 cursor-pointer ${getPlatformStyles(
                p,
                isActive
              )}`}
            >
              {getPlatformIcon(p)}
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>

      {/* Advanced Search Bar Input */}
      <div className="relative w-full shadow-sm rounded-xl">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg
            className="w-4.5 h-4.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by handle or full name..."
          className="w-full pl-10 pr-10 py-3.5 border border-slate-200 bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-4.5 h-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

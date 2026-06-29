interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span className="group relative inline-flex items-center ml-1 select-none">
      {/* Premium Verified Seal */}
      <svg
        className="w-4.5 h-4.5 text-blue-500 fill-current filter drop-shadow-[0_2px_5px_rgba(59,130,246,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 cursor-help"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Main circular seal */}
        <circle cx="12" cy="12" r="10" fill="#3b82f6" />
        {/* Crisp checkmark path */}
        <path
          d="M9.5 15.2l-3.2-3.2 1.4-1.4 1.8 1.8 5.6-5.6 1.4 1.4-7 7z"
          fill="#ffffff"
        />
      </svg>

      {/* Sleek Floating Hover Tooltip */}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 text-[9px] font-extrabold text-white bg-slate-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-50 tracking-wider">
        VERIFIED CREATOR
        {/* Tooltip triangle arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
}

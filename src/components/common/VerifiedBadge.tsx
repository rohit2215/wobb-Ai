interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <svg
      className="w-4 h-4 text-blue-500 fill-current inline-block select-none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      title="Verified Creator"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

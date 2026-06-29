import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useInfluencerStore } from "@/store/useInfluencerStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  const isSelected = selectedProfiles.some((p) => p.user_id === profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation click
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      // Pass platform type details to profile summary for rendering helper
      addProfile({
        ...profile,
        type: platform,
      } as any);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl mb-3 cursor-pointer hover:shadow-md transition-shadow bg-white w-full max-w-2xl"
      data-search={searchQuery}
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        className="w-12 h-12 rounded-full object-cover border border-gray-100"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            profile.fullname || profile.username
          )}`;
        }}
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-bold text-gray-900 flex items-center gap-0.5 truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 truncate">{profile.fullname}</div>
        <div className="text-xs text-gray-400 mt-0.5">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
      <button
        onClick={handleListToggle}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
          isSelected
            ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        {isSelected ? (
          <>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Added
          </>
        ) : (
          "Add to List"
        )}
      </button>
    </div>
  );
}

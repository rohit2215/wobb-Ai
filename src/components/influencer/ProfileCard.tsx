import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { animateFlyToCart } from "@/utils/flyEffect";

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
  const imgRef = useRef<HTMLImageElement>(null);

  const isSelected = selectedProfiles.some((p) => p.user_id === profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents layout navigation click trigger
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      // Trigger cart fly animation
      if (imgRef.current) {
        animateFlyToCart(imgRef.current, profile.picture);
      }
      addProfile({
        ...profile,
        type: platform,
      } as any);
    }
  };

  // Border colors matching the platform
  const getBorderColor = (p: Platform) => {
    switch (p) {
      case "instagram":
        return "border-l-pink-500";
      case "youtube":
        return "border-l-red-500";
      case "tiktok":
        return "border-l-slate-800";
      default:
        return "border-l-indigo-600";
    }
  };

  // Avatar ring color utility
  const getRingColor = (p: Platform) => {
    switch (p) {
      case "instagram":
        return "ring-pink-500/20";
      case "youtube":
        return "ring-red-500/20";
      case "tiktok":
        return "ring-slate-800/20";
      default:
        return "ring-indigo-600/20";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 p-4 border border-slate-200 rounded-2xl mb-4 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 bg-white w-full max-w-2xl border-l-4 ${getBorderColor(
        platform
      )}`}
      data-search={searchQuery}
    >
      <img
        ref={imgRef}
        src={profile.picture}
        alt={profile.fullname}
        className={`w-14 h-14 rounded-full object-cover p-0.5 ring-2 bg-white ${getRingColor(
          platform
        )}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            profile.fullname || profile.username
          )}`;
        }}
      />
      
      <div className="text-left flex-1 min-w-0">
        <div className="font-extrabold text-slate-900 text-base flex items-center gap-1 truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm font-semibold text-slate-500 truncate mt-0.5">
          {profile.fullname}
        </div>
        <div className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1.5 capitalize">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
          {platform} • {formatFollowers(profile.followers)} followers
        </div>
      </div>

      <button
        onClick={handleListToggle}
        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-1 ${
          isSelected
            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm hover:bg-indigo-700"
            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
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

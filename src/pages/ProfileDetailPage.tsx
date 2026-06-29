import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useInfluencerStore } from "@/store/useInfluencerStore";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platformParam = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p className="text-red-500 font-bold">Invalid profile path</p>
        <Link to="/" className="text-blue-600 underline">
          Back
        </Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-semibold text-sm">Loading creator intelligence...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-16 bg-white border border-slate-100 rounded-3xl shadow-sm px-6">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-slate-800 font-bold text-lg mb-2">
            Could not load profile details
          </p>
          <p className="text-slate-500 text-sm mb-6">
            We couldn't retrieve database results for "@{username}".
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const platform = user.type || platformParam;
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);

  const handleToggle = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile({
        ...user,
        type: platform,
      } as any);
    }
  };

  const getRingColor = (p: string) => {
    switch (p) {
      case "instagram":
        return "ring-pink-500/20";
      case "youtube":
        return "ring-red-500/20";
      case "tiktok":
        return "ring-slate-800/20";
      default:
        return "ring-indigo-500/20";
    }
  };

  return (
    <Layout>
      {/* Dynamic Styled Back Button */}
      <div className="text-left max-w-2xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-full transition-all duration-200 shadow-sm cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </Link>
      </div>

      {/* Main Profile Info Card Container */}
      <div className="p-6 sm:p-8 border border-slate-200 rounded-3xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left transition-all">
        <img
          src={user.picture}
          alt={user.fullname}
          className={`w-24 h-24 rounded-full object-cover p-1 ring-4 bg-white ${getRingColor(
            platform
          )}`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              user.fullname || user.username
            )}`;
          }}
        />

        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center justify-center sm:justify-start gap-1 truncate leading-tight">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-base font-semibold text-slate-500 mt-1">
            {user.fullname}
          </p>
          
          {/* Platform Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full font-bold text-[10px] mt-2 capitalize select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {platform} Creator
          </span>

          {user.description && (
            <p className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">
              {user.description}
            </p>
          )}

          {/* Stats Display Panel Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Followers
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1">
                {formatFollowers(user.followers, 2)}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Engagement Rate
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1">
                {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>

            {user.posts_count !== undefined && (
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Posts
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-1">
                  {user.posts_count}
                </div>
              </div>
            )}

            {user.avg_likes !== undefined && (
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Avg Likes
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-1">
                  {formatFollowers(user.avg_likes, 2)}
                </div>
              </div>
            )}

            {user.avg_comments !== undefined && (
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Avg Comments
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-1">
                  {formatFollowers(user.avg_comments)}
                </div>
              </div>
            )}

            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Avg Views
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-1">
                  {formatFollowers(user.avg_views, 2)}
                </div>
              </div>
            )}

            {user.engagements !== undefined && (
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-100/50 transition-colors col-span-2 sm:col-span-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Engagements
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-1">
                  {formatFollowers(user.engagements)}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 items-center justify-center sm:justify-start">
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                className="inline-flex items-center gap-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                View on Platform →
              </a>
            )}

            <button
              onClick={handleToggle}
              className={`px-5 py-2 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {isSelected ? (
                <>
                  <svg
                    className="w-4 h-4"
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
                  Added to List
                </>
              ) : (
                "Add to List"
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

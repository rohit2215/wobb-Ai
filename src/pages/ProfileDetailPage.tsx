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
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
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
      addProfile(user);
    }
  };

  return (
    <Layout title={user.fullname}>
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block">
        ← Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto">
        <img
          src={user.picture}
          alt={user.fullname}
          className="w-24 h-24 rounded-full border object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              user.fullname || user.username
            )}`;
          }}
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-600">{user.fullname}</p>
          <p className="text-xs text-gray-400 mt-1 capitalize">Platform: {platform}</p>

          {user.description && (
            <p className="mt-3 text-sm text-gray-700">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border p-2 rounded">
              <div className="text-gray-500">Followers</div>
              <div className="font-semibold">
                {formatFollowers(user.followers, 2)}
              </div>
            </div>
            <div className="border p-2 rounded">
              <div className="text-gray-500">Engagement Rate</div>
              <div className="font-semibold">
                {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Posts</div>
                <div className="font-semibold">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Avg Likes</div>
                <div className="font-semibold">
                  {formatFollowers(user.avg_likes, 2)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Avg Comments</div>
                <div className="font-semibold">{formatFollowers(user.avg_comments)}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Avg Views</div>
                <div className="font-semibold">
                  {formatFollowers(user.avg_views, 2)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Engagements</div>
                <div className="font-semibold">
                  {formatFollowers(user.engagements)}
                </div>
              </div>
            )}
          </div>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              className="inline-block mt-4 text-blue-600 text-sm"
            >
              View on platform →
            </a>
          )}

          <button
            onClick={handleToggle}
            className={`block mt-5 px-5 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isSelected
                ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
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
    </Layout>
  );
}

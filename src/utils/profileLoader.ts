import type { ProfileDetailResponse } from "@/types";
import { extractProfiles, PLATFORMS } from "./dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const targetPath = `../assets/data/profiles/${username}.json`.toLowerCase();
  
  // Find case-insensitive match in dynamic import module keys
  const matchingKey = Object.keys(profileModules).find(
    (key) => key.toLowerCase() === targetPath
  );

  if (matchingKey) {
    const loader = profileModules[matchingKey];
    const result = await loader();
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  }

  // Fallback: If no static detail JSON file exists, search the search data files
  // and dynamically synthesize a detailed profile response.
  const normalizedUsername = username.toLowerCase();
  for (const platform of PLATFORMS) {
    const profiles = extractProfiles(platform);
    const found = profiles.find(
      (p) => p.username.toLowerCase() === normalizedUsername
    );
    
    if (found) {
      const rate = found.engagement_rate || 0.015;
      const engagements =
        found.engagements || Math.floor(found.followers * rate);
      const avgLikes = Math.floor(engagements * 0.92);
      const avgComments = Math.floor(engagements * 0.08);

      return {
        cached: true,
        data: {
          success: true,
          user_profile: {
            ...found,
            type: platform,
            description: `Official ${platform} creator profile for @${found.username}. Check out key engagement statistics, posts history, and detailed metrics.`,
            posts_count: Math.floor(Math.random() * 600) + 150,
            engagements,
            avg_likes: avgLikes,
            avg_comments: avgComments,
            avg_views:
              platform === "youtube" || platform === "tiktok"
                ? Math.floor(found.followers * 0.12)
                : undefined,
          } as any,
        },
      };
    }
  }

  return null;
}

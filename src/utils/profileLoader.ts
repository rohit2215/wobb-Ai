import type { ProfileDetailResponse } from "@/types";

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

  if (!matchingKey) {
    return null;
  }

  const loader = profileModules[matchingKey];
  const result = await loader();
  const data =
    (result as { default?: ProfileDetailResponse }).default ?? result;
  return data as ProfileDetailResponse;
}

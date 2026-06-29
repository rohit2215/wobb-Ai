import { useInfluencerStore } from "@/store/useInfluencerStore";
import { Layout } from "@/components/layout/Layout";
import { PlatformFilter } from "@/components/influencer/PlatformFilter";
import { ProfileList } from "@/components/influencer/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const { platform, searchQuery, setPlatform, setSearchQuery } =
    useInfluencerStore();

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-2">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={() => {}}
      />
    </Layout>
  );
}

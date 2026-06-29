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
    <Layout>
      {/* Premium Hero Title Banner */}
      <div className="text-center max-w-xl mx-auto mt-6 mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find the Perfect{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Creator
          </span>
        </h1>
        <p className="text-slate-600 mt-4 text-base sm:text-lg font-medium">
          Search and organize top-tier influencers across Instagram, YouTube,
          and TikTok in real-time.
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="w-full max-w-2xl mx-auto flex items-center justify-between px-2 mb-4 text-[10px] sm:text-xs font-bold text-slate-500 select-none">
        <span>ACTIVE SEARCH RESULTS</span>
        <span className="capitalize">
          Showing {filtered.length} of {allProfiles.length} on {platform}
        </span>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={() => {}}
      />
    </Layout>
  );
}

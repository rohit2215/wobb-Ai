import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

interface InfluencerState {
  platform: Platform;
  searchQuery: string;
  selectedProfiles: UserProfileSummary[];
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  clearProfiles: () => void;
}

export const useInfluencerStore = create<InfluencerState>()(
  persist(
    (set) => ({
      platform: "instagram",
      searchQuery: "",
      selectedProfiles: [],
      setPlatform: (platform) => set({ platform }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addProfile: (profile) =>
        set((state) => {
          // Prevent duplicates by checking user_id
          const exists = state.selectedProfiles.some(
            (p) => p.user_id === profile.user_id
          );
          if (exists) return {};
          return { selectedProfiles: [...state.selectedProfiles, profile] };
        }),
      removeProfile: (userId) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        })),
      clearProfiles: () => set({ selectedProfiles: [] }),
    }),
    {
      name: "wobb-influencer-search-storage",
      // Only persist the selected list, not temporary search or filter states
      partialize: (state) => ({ selectedProfiles: state.selectedProfiles }),
    }
  )
);

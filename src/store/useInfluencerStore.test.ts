import { beforeEach, describe, expect, it } from "vitest";
import { useInfluencerStore } from "./useInfluencerStore";

const MOCK_PROFILE_1 = {
  user_id: "user_123",
  username: "mrbeast",
  fullname: "Jimmy Donaldson",
  picture: "http://image.url",
  followers: 120000000,
  is_verified: true,
};

const MOCK_PROFILE_2 = {
  user_id: "user_456",
  username: "khaby.lame",
  fullname: "Khaby Lame",
  picture: "http://image.url2",
  followers: 160000000,
  is_verified: true,
};

describe("useInfluencerStore", () => {
  beforeEach(() => {
    // Reset state before each test run
    useInfluencerStore.setState({
      platform: "instagram",
      searchQuery: "",
      selectedProfiles: [],
    });
  });

  it("should have correct initial state", () => {
    const state = useInfluencerStore.getState();
    expect(state.platform).toBe("instagram");
    expect(state.searchQuery).toBe("");
    expect(state.selectedProfiles).toEqual([]);
  });

  it("should update platform selection", () => {
    useInfluencerStore.getState().setPlatform("tiktok");
    expect(useInfluencerStore.getState().platform).toBe("tiktok");
  });

  it("should update search queries", () => {
    useInfluencerStore.getState().setSearchQuery("gaming");
    expect(useInfluencerStore.getState().searchQuery).toBe("gaming");
  });

  it("should add unique profiles to selection lists", () => {
    const store = useInfluencerStore.getState();
    store.addProfile(MOCK_PROFILE_1);
    
    expect(useInfluencerStore.getState().selectedProfiles).toHaveLength(1);
    expect(useInfluencerStore.getState().selectedProfiles[0].user_id).toBe("user_123");
  });

  it("should enforce strict duplicate prevention based on user_id", () => {
    const store = useInfluencerStore.getState();
    store.addProfile(MOCK_PROFILE_1);
    
    // Add identical profile again
    store.addProfile(MOCK_PROFILE_1);
    
    expect(useInfluencerStore.getState().selectedProfiles).toHaveLength(1);
  });

  it("should remove profiles correctly", () => {
    const store = useInfluencerStore.getState();
    store.addProfile(MOCK_PROFILE_1);
    store.addProfile(MOCK_PROFILE_2);
    
    expect(useInfluencerStore.getState().selectedProfiles).toHaveLength(2);
    
    useInfluencerStore.getState().removeProfile("user_123");
    
    expect(useInfluencerStore.getState().selectedProfiles).toHaveLength(1);
    expect(useInfluencerStore.getState().selectedProfiles[0].user_id).toBe("user_456");
  });

  it("should clear the selection list", () => {
    const store = useInfluencerStore.getState();
    store.addProfile(MOCK_PROFILE_1);
    store.addProfile(MOCK_PROFILE_2);
    
    expect(useInfluencerStore.getState().selectedProfiles).toHaveLength(2);
    
    useInfluencerStore.getState().clearProfiles();
    
    expect(useInfluencerStore.getState().selectedProfiles).toEqual([]);
  });
});

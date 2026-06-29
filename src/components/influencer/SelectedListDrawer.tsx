import { useInfluencerStore } from "@/store/useInfluencerStore";
import { formatFollowers } from "@/utils/formatters";
import { getPlatformLabel } from "@/utils/dataHelpers";

interface SelectedListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelectedListDrawer({ isOpen, onClose }: SelectedListDrawerProps) {
  const { selectedProfiles, removeProfile, clearProfiles } = useInfluencerStore();

  const handleExport = () => {
    if (selectedProfiles.length === 0) return;
    const exportData = selectedProfiles.map((p) => ({
      username: p.username,
      fullname: p.fullname,
      followers: p.followers,
      url: p.url,
    }));
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportData, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "selected_influencers.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Drawer Content */}
        <div className="w-screen max-w-md transform bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full border-l border-gray-200">
          {/* Header */}
          <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Selected Influencers
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedProfiles.length} creator
                {selectedProfiles.length !== 1 ? "s" : ""} selected
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* List Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {selectedProfiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-12">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="font-medium text-gray-700">Your list is empty</p>
                <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                  Add creators from the search results or profile pages.
                </p>
              </div>
            ) : (
              selectedProfiles.map((profile) => (
                <div
                  key={profile.user_id}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-white"
                >
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-semibold text-sm text-gray-900 truncate">
                      @{profile.username}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {profile.fullname}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-medium text-gray-600 capitalize">
                        {getPlatformLabel(
                          (profile as any).type || "instagram"
                        )}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {formatFollowers(profile.followers)} followers
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    className="p-1.5 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove from list"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls */}
          {selectedProfiles.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-3">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium text-sm transition-colors shadow-sm cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export List (JSON)
              </button>
              <button
                onClick={clearProfiles}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-lg font-medium text-sm transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

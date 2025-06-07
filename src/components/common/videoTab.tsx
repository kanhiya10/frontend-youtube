// components/VideosTab.tsx

import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserVideos } from "../../hooks/useUserVideos";
import { usePagination } from "../../hooks/usePagination";
import { useVideoPlayTracker } from "../../hooks/useVideoPlayerTracker";
import {PaginationControls} from "./paginationControl";
import VideoPlayer from "./videoPlayer";

const VideosTab = () => {
  const { username } = useParams<{ username: string }>();
  const { videos, loading } = useUserVideos(username);

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const trackPlay = useVideoPlayTracker(videos[0]?._id);

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      const dateA = new Date(a.createdAt || "").getTime();
      const dateB = new Date(b.createdAt || "").getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [videos, sortOrder]);

  const {
    currentPage,
    totalPages,
    paginatedItems: currentVideos,
    next,
    prev,
    setCurrentPage,
  } = usePagination(sortedVideos, 3);

  const handlePlay = () => {
    if (currentVideos.length > 0) {
      trackPlay();
    }
  };

  if (loading) return <p className="text-center py-10">Loading videos...</p>;

  return (
    <div className="p-4 bg-gray-100 dark:bg-black min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          All Videos
        </h2>
        <select
          className="p-2 rounded border dark:bg-[#1a1a1a] dark:text-white"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as "newest" | "oldest");
            setCurrentPage(1);
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {currentVideos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentVideos.map((video) => (
              <VideoPlayer
              className="w-full h-auto max-h-[60vh] rounded-lg shadow-xl"
                src={video.videoFile}
                poster={video.thumbnail}
                onPlay={() => handlePlay()}
              />
            ))}
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={prev}
            onNext={next}
          />
        </>
      )}
    </div>
  );
};

export default VideosTab;

import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserVideos } from "../../hooks/useUserVideos";
import { usePagination } from "../../hooks/usePagination";
import { useVideoPlayTracker } from "../../hooks/useVideoPlayerTracker";
import { PaginationControls } from "./paginationControl";
import VideoPlayer from "./videoPlayer";
import { useTheme } from "../../context/themeContext";
import { useStyles } from "../../utils/styleImports";
import { deleteVideo } from "../../services/videos";


const VideosTab = () => {
  const { username } = useParams<{ username: string }>();
  const { videos, loading, refetch } = useUserVideos(username);
  const { theme } = useTheme();
  const { containerStylev2, headingStyle, select, labelStyle, noVideosText } = useStyles();

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [deletingVideoId, setDeletingVideoId] = useState<string | null>(null);
  const isCurrentUser = !username; // If no username param, it's the current user's profile
  const trackPlay = useVideoPlayTracker();

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

  const videoTimestamps = [
    { time: 0, label: 'Introduction' },
    { time: 5, label: 'Main concepts' },
    { time: 10, label: 'Technical demonstration' },
    { time: 20, label: 'Case study' },
    { time: 23, label: 'Conclusion' }
  ];

  const handleDeleteVideo = async (videoId: string) => {
    if (!window.confirm("Are you sure you want to delete this video? This action cannot be undone.")) {
      return;
    }

    setDeletingVideoId(videoId);
    try {
      await deleteVideo(videoId);
      // Refresh the videos list after successful deletion
      await refetch();
      alert("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    } finally {
      setDeletingVideoId(null);
    }
  };

  if (loading) return <p className="text-center py-10" style={labelStyle}>Loading videos...</p>;

  return (
    <div className="p-4 min-h-screen" style={containerStylev2}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold" style={headingStyle}>
          All Videos
        </h2>
        <select
          className="p-2 rounded border"
          style={select}
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
        <p className="text-center" style={noVideosText}>No videos found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentVideos.map((video) => (
              <div key={video._id} className="relative group">
                <VideoPlayer
                  src={video.videoFile}
                  poster={video.thumbnail}
                  onPlay={() => trackPlay(video._id)}
                  className="w-full h-auto max-h-[60vh] rounded-lg shadow-xl"
                  timestamps={videoTimestamps}
                />
                
                {/* Delete button - only show for current user's own videos */}
                {isCurrentUser && (
                  <button
                    onClick={() => handleDeleteVideo(video._id)}
                    disabled={deletingVideoId === video._id}
                    className={`absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                      deletingVideoId === video._id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title="Delete video"
                  >
                    {deletingVideoId === video._id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Video title overlay (optional) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                  <h3 className="text-white text-sm font-medium truncate">
                    {video.title || "Untitled Video"}
                  </h3>
                </div>
              </div>
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
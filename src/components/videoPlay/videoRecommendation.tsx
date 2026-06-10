import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { useStyles } from "../../utils/styleImports";
import { getVideoRecommendations, getRandomVideos } from "../../services/videos";
import { HomeInfoType } from "../../types/types";
import { VideoCard } from "../common/videoCard";

function RecommendedVideos() {
  const [videos, setVideos] = useState<HomeInfoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { info } = useSelector((state: any) => state.User);
  const isLoggedIn = !!info;

  const {
    containerStyle,
    cardStyle,
    navBorderStyle,
    headingStyle,
    videoItemStyle,
    loadingStyle,
    skeletonStyle,
  } = useStyles();

  useEffect(() => {
    async function fetchVideos() {
      try {
        setIsLoading(true);
        let response;
        if (isLoggedIn) {
          // ✅ fetch recommended videos for logged in user
          response = await getVideoRecommendations();
          setVideos(response.data.recommended || []);
        } else {
          // ✅ fetch random videos for guest user
          response = await getRandomVideos();
          setVideos(response.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div className="w-full space-y-4" style={containerStyle}>
        <div className="rounded-xl p-6 shadow-lg border" style={cardStyle}>
          <h2 className="text-lg font-bold mb-6" style={headingStyle}>
            {isLoggedIn ? "Recommended Videos" : "Explore Videos"}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg aspect-video mb-3" style={skeletonStyle}></div>
                <div className="space-y-2">
                  <div className="h-4 rounded w-3/4" style={skeletonStyle}></div>
                  <div className="h-3 rounded w-1/2" style={skeletonStyle}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div className="w-full">
      <div className="rounded-xl shadow-lg overflow-hidden border" style={cardStyle}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b" style={navBorderStyle}>
          <h2 className="text-lg lg:text-xl font-bold" style={headingStyle}>
            {isLoggedIn ? "Recommended Videos" : "Explore Videos"}
          </h2>
        </div>

        {/* Videos List */}
        <div className="p-2 sm:p-4">
          {videos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎬</div>
              <p style={loadingStyle}>
                {isLoggedIn
                  ? "No recommendations available"
                  : "No videos to display"}
              </p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendedVideos;

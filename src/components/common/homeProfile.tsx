import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "./videoPlayer";
import { useUserVideos } from "../../hooks/useUserVideos";
import { useVideoPlayTracker } from "../../hooks/useVideoPlayerTracker";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  videoFile: string;
}

const HomeProfile = () => {
   const { username } = useParams<{ username: string }>();

   const { videos, loading } = useUserVideos(username);

   const trackPlay = useVideoPlayTracker(videos[0]?._id);

   const handlePlay = () => {
     if (videos.length > 0) {
       trackPlay();
     }
   };

   if (loading) {
     return (
       <div className="text-center py-10">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
       </div>
     );
   }

  return (
    <div className="w-full px-6 py-4 bg-gray-100">
      {videos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No videos available
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Featured Video */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Featured Video</h2>
            <div className="w-full max-w-2xl mx-auto bg-white shadow rounded-lg overflow-hidden ">
              {/* <video
                src={videos[0].videoUrl}
                controls
                className="w-full h-64 object-cover"
              /> */}
              <VideoPlayer
                src={videos[0].videoFile}
                poster={videos[0].thumbnail}
                onPlay={() => handlePlay()}
                className="w-full h-auto max-h-[60vh] rounded-lg shadow-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">{videos[0].title}</h3>
              </div>
            </div>
          </div>

          {/* Latest Videos (Horizontal Scroll) */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Latest Uploads</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {videos.slice(1).map((video) => (
                <div
                  key={video._id}
                  className="min-w-[200px] bg-white rounded-lg shadow-md hover:scale-[1.02] transition"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <p className="text-sm font-semibold">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeProfile;

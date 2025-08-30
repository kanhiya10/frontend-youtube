import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RecommandType } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import { Play, Clock } from 'lucide-react';

function RecommendedVideos() {
  const [videos, setVideos] = useState<RecommandType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'https://backend-youtube-zba1.onrender.com/api/v1/recommendations/collection',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        console.log("response in videoRecommendation", response);
        setVideos(response.data.recommended);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  // const handleTest = async (videoId: any) => {
  //   console.log("videoId in videoRecommendation", videoId);

  //   await axios.get(
  //     `https://backend-youtube-zba1.onrender.com/api/v1/recommendations/recommend/${videoId}`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     }
  //   );
  // };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4" style={{ backgroundColor: theme.background }}>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recommended Videos</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-video mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
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
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
            Recommended Videos
          </h2>
        </div>

        {/* Videos List */}
        <div className="p-2 sm:p-4">
          {videos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎬</div>
              <p className="text-gray-500 dark:text-gray-400">No recommendations available</p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                  onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:flex gap-4 p-3">
                    <div className="relative w-40 flex-shrink-0">
                      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={`Thumbnail for ${video.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{video.views?.toLocaleString() || '0'} views</span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                      {video && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(5)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile and Tablet Layout */}
                  <div className="lg:hidden">
                    <div className="relative aspect-video bg-gray-900">
                      <img
                        src={video.thumbnail}
                        alt={`Thumbnail for ${video.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      {video && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {formatDuration(5)}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{video.views?.toLocaleString() || '0'} views</span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendedVideos;

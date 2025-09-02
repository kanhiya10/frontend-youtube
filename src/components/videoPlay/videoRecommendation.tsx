import React, { useEffect, useState } from 'react';
import { RecommandType } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import { Play, Clock } from 'lucide-react';
import { getVideoRecommendations } from '../../services/videos';
import { useStyles } from '../../utils/styleImports';

function RecommendedVideos() {
  const [videos, setVideos] = useState<RecommandType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { containerStyle, cardStyle, navBorderStyle, headingStyle, videoItemStyle, loadingStyle, skeletonStyle } = useStyles();

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setIsLoading(true);
        const response = await getVideoRecommendations();
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

 

  if (isLoading) {
    return (
      <div className="w-full space-y-4" style={containerStyle}>
        <div className="rounded-xl p-6 shadow-lg border" style={cardStyle}>
          <h2 className="text-lg font-bold mb-6" style={headingStyle}>Recommended Videos</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
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
            Recommended Videos
          </h2>
        </div>

        {/* Videos List */}
        <div className="p-2 sm:p-4">
          {videos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎬</div>
              <p style={loadingStyle}>No recommendations available</p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="group cursor-pointer rounded-lg overflow-hidden border hover:shadow-md transition-all duration-200"
                  style={{
                    ...videoItemStyle
                  }}
                  onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.border;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.borderLight;
                  }}
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
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1">
                      <h3 
                        className="text-sm font-medium leading-tight mb-2 transition-colors line-clamp-2"
                        style={headingStyle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme.info;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme.text;
                        }}
                      >
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs" style={loadingStyle}>
                        <span>{video.views?.toLocaleString() || '0'} views</span>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.textMuted }}></div>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                      {video && (
                        <div className="flex items-center gap-1 mt-1 text-xs" style={loadingStyle}>
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
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      {video && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {formatDuration(5)}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3">
                      <h3 
                        className="text-sm font-medium leading-tight mb-2 transition-colors line-clamp-2"
                        style={{
                          ...headingStyle
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme.info;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme.text;
                        }}
                      >
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs" style={loadingStyle}>
                        <span>{video.views?.toLocaleString() || '0'} views</span>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.textMuted }}></div>
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
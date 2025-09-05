import React from 'react';
import { useTheme } from '../../context/themeContext';
import { useStyles } from '../../utils/styleImports';
import { HomeInfoType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useTime } from '../../hooks/useTime';
import { formatDuration } from '../../utils/durationFormattor';

export function VideoCard({ video }: { video: HomeInfoType }) {
  const uploadedAgo = useTime(video.createdAt);
  const navigate = useNavigate();
  const { videoCardStyle, videoCardHoverStyle, videoInfoStyle, videoTitleStyle, loadingStyle } = useStyles();

  return (
    <div
      className="rounded-md overflow-hidden cursor-pointer border transition-all duration-200 hover:scale-[1.02]"
      style={videoCardStyle}
      onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = videoCardHoverStyle.boxShadow || '';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = videoCardStyle.boxShadow || '';
      }}
    >
      {/* Thumbnail with duration overlay */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          className="w-full h-36 object-cover"
        />
        {video.duration && (
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>

      {/* Info section */}
      <div className="p-2" style={videoInfoStyle}>
        <h1 className="text-sm font-bold mb-1 line-clamp-2" style={videoTitleStyle}>
          {video.title}
        </h1>

        <div className="flex items-center gap-2 text-xs mt-1" style={loadingStyle}>
          <span>{video.views} views</span>
          <span>•</span>
          <span>{uploadedAgo}</span>
        </div>
      </div>
    </div>
  );
}

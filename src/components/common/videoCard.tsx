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
  const isMembersOnly = video.visibility === "members";

  return (
    <div
      className="rounded-md overflow-hidden cursor-pointer border transition-all duration-200 hover:scale-[1.02]"
      style={{
        ...videoCardStyle,
        borderColor: isMembersOnly ? "#eab308" : videoCardStyle.borderColor,
        borderWidth: isMembersOnly ? "2px" : videoCardStyle.borderWidth,
      }}
      onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isMembersOnly
          ? "0 0 18px rgba(234,179,8,0.45)"
          : videoCardHoverStyle.boxShadow || "";
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
          className={`w-full h-36 object-cover ${isMembersOnly ? "brightness-75" : ""
            }`}
        />

        {isMembersOnly && (
          <>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded-full text-[11px] font-semibold">
              🔒 Members Only
            </div>
          </>
        )}

        {video.duration && (
          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>

      {/* Info section */}
      <div className="p-2" style={videoInfoStyle}>
        <h1
          className="text-sm font-bold mb-1 line-clamp-2"
          style={videoTitleStyle}
        >
          {isMembersOnly && <span className="mr-1">🔒</span>}
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

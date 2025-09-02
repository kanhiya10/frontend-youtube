import React from 'react';
import { useTheme } from '../../context/themeContext';
import { useStyles } from '../../utils/styleImports';
import { HomeInfoType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useTime } from '../../hooks/useTime';

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
      <img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} className="w-full h-36 object-contain" />
      <div className="p-2" style={videoInfoStyle}>
        <h1 className="text-sm font-bold mb-1" style={videoTitleStyle}>
          {video.title}
        </h1>
        <p className="text-xs mt-1" style={loadingStyle}>
          {uploadedAgo}
        </p>
      </div>
    </div>
  );
}

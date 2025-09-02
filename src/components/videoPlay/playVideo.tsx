import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoInfoType } from '../../types/types';
import axios from 'axios';
import VideoPlayer from '../common/videoPlayer';
import { useVideoPlayTracker } from '../../hooks/useVideoPlayerTracker';
import { useTheme } from '../../context/themeContext';
import { useStyles } from '../../utils/styleImports';

interface PlayVideoProps {
  VideoInfo: VideoInfoType;
}

const videoTimestamps = [
  { time: 0, label: 'Introduction' },
  { time: 5, label: 'Main concepts' },
  { time: 10, label: 'Technical demonstration' },
  { time: 20, label: 'Case study' },
  { time: 23, label: 'Conclusion' }
];

const PlayVideo: React.FC<PlayVideoProps> = ({ VideoInfo }) => {
  const navigate = useNavigate();
  const trackPlay = useVideoPlayTracker();
  const { theme } = useTheme();
  const { containerStyle, cardStyle, labelStyle, headingStyle, errorText } = useStyles();

  const goBack = () => navigate(-1);

  if (!VideoInfo) {
    return (
      <div className="flex items-center justify-center h-96 rounded-xl shadow-lg border" style={cardStyle}>
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-lg font-semibold" style={errorText}>
            No video information available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={containerStyle}>
      {/* Back Button - Only on mobile */}
      <div className="lg:hidden mb-4">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-3 py-2 transition-colors"
          style={labelStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.textSecondary;
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Video Player Container */}
      <div className="rounded-xl shadow-lg overflow-hidden border" style={cardStyle}>
        <div className="relative aspect-video bg-black overflow-hidden">
          <VideoPlayer
            src={VideoInfo.video.videoFile}
            poster={VideoInfo.video.thumbnail}
            onPlay={() => trackPlay(VideoInfo.video._id)}
            timestamps={videoTimestamps}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Video Title */}
        <div className="p-4 sm:p-6" style={{ backgroundColor: theme.card }}>
          {VideoInfo.video.title && (
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight" style={headingStyle}>
              {VideoInfo.video.title}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
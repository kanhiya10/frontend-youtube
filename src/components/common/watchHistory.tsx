import React from "react";
import { useEffect, useState } from "react";
import { HomeInfoType } from "../../types/types";
import { useTheme } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";
import { getWatchHistory, clearWatchHistory } from "../../services/users";
import { useStyles } from "../../utils/styleImports";
import { VideoCard } from "./videoCard";

const WatchHistory = () => {
  const [history, setHistory] = useState<HomeInfoType[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { videoCard, hoverShadow, videoInfo, headingStyle, noVideosText } = useStyles();

  const fetchHistory = async () => {
    try {
      const response = await getWatchHistory();
      setHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching watch history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    try {
      await clearWatchHistory();
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history', error);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: theme.background }}>
        <span className="text-lg" style={{ color: theme.textSecondary }}>Loading...</span>
      </div>
    );
  }

  return (
    history.length > 0 ? (
      <div
        className="min-h-screen py-10 px-4"
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>Watch History</h1>
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 rounded"
            style={{ backgroundColor: theme.error, color: theme.text }}
          >
            Clear History
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {history.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: theme.background }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>No Watch History</h1>
        <p style={{ color: theme.textMuted }}>You have not watched any videos yet.</p>
      </div>
    )
  );
};

export default WatchHistory;
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/themeContext";
import { UserPlus, UserCheck, Play, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchResultType } from "../../types/types";
import { searchAll } from "../../services/searchApi"; // Import the API service
import { useStyles } from "../../utils/styleImports";

export default function SearchResults() {
  const [results, setResults] = useState<SearchResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { theme } = useTheme();
  const{loadingStyle,videoCardHoverStyle,videoInfoStyle,videoCardStyle,errorStyle,videoTitleStyle}=useStyles();

  const [params] = useSearchParams();
  const query = params.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || !query.trim()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      
      try {
        const response = await searchAll(query);
        console.log("Search results:", response.data);
        setResults(response.data);
      } catch (error: any) {
        console.error("Search failed", error);
        setError("Failed to search. Please try again.");
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p style={{ color: theme.text }}>Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.background }}>
        <div className="text-center">
          <div className="mb-4 p-4 rounded-lg border" style={errorStyle}>
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!query || !query.trim()) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.background }}>
        <p className="text-center" style={{ color: theme.textMuted }}>
          Enter a search query to find creators and videos.
        </p>
      </div>
    );
  }

  if (!results || (results.creators.length === 0 && results.videos.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.background }}>
        <p className="text-center" style={{ color: theme.textMuted }}>
          No results found for "{query}".
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Results for "{query}"</h2>

        {/* ---------- Creators Section ---------- */}
        {results.creators.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Creators</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.creators.map((user: any) => (
                <div
                  key={user._id}
                  className="p-4 rounded-2xl flex items-center gap-4 shadow hover:shadow-lg transition"
                  style={{ backgroundColor: theme.card, borderColor: theme.border }}
                >
                  <div
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() => navigate(`/videoPlay/ownerProfile/${user.username}`)}
                  >
                    <img 
                      src={user.avatar} 
                      className="w-14 h-14 rounded-full object-cover" 
                      alt={`${user.fullName}'s avatar`}
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg">{user.fullName}</p>
                      <p className="text-sm" style={{ color: theme.textSecondary }}>@{user.username}</p>
                      <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                        {user.subscribersCount} subscribers
                      </p>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: user.isSubscribed ? theme.border : theme.text,
                      color: user.isSubscribed ? theme.text : theme.background
                    }}
                  >
                    {user.isSubscribed ? <UserCheck size={16} /> : <UserPlus size={16} />}
                    {user.isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Videos Section ---------- */}
        {results.videos.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Videos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.videos.map((video: any) => (
                <div
                  key={video._id}
                  className="rounded-md overflow-hidden cursor-pointer border transition-all duration-200 hover:scale-[1.02]"
                  style={videoCardStyle}
                  onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = videoCardHoverStyle.boxShadow || "";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = videoCardStyle.boxShadow || "";
                  }}
                >
                  {/* Thumbnail with duration overlay */}
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={`Thumbnail for ${video.title}`}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    {video.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                        {formatTime(video.duration)}
                      </span>
                    )}
                  </div>

                  {/* Video info */}
                  <div className="p-3" style={videoInfoStyle}>
                    <h1 className="text-sm font-bold mb-1 line-clamp-2" style={videoTitleStyle}>
                      {video.title}
                    </h1>

                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="flex items-center gap-1" style={{ color: theme.textMuted }}>
                        <Eye size={14} /> {video.views} views
                      </span>
                      <span style={loadingStyle}>
                        {new Date(video.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
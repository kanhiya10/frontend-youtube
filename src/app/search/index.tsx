// pages/SearchResults.tsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {useTheme} from "../../context/themeContext";

export default function SearchResults() {
//   const [searchParams] = useSearchParams();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

 const [params] = useSearchParams();
const query = params.get("q");

console.log("query", query);

  

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/search?q=${query}`);
        setResults(res.data);
      } catch (error) {
        console.error("Search failed", error);
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    if (query && query.trim()) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <p className="text-center mt-8">Searching...</p>;

  if (!results || (results.creators.length === 0 && results.videos.length === 0)) {
    return <p className="text-center mt-8 text-gray-500">No results found for "{query}".</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4" style={{ backgroundColor: theme.background }}>
      <h2 className="text-2xl font-semibold mb-4">Results for “{query}”</h2>

      {results.creators.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Creators</h3>
          <div className="grid grid-cols-2 gap-4">
            {results.creators.map((user: any) => (
              <div key={user._id} className="p-3 border rounded-lg flex items-center gap-3">
                <img src={user.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.videos.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Videos</h3>
          <div className="grid grid-cols-2 gap-4">
            {results.videos.map((video: any) => (
              <div
                key={video._id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer"
              >
                <img src={video.thumbnail} className="w-full h-36 object-cover" />
                <div className="p-2">
                  <p className="font-medium text-sm">{video.title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

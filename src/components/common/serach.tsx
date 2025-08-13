// components/SearchBar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 rounded-lg flex-1"
        style={{ backgroundColor: theme.search}}
        placeholder="Search creators or videos..."
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}

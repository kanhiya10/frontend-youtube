import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket";

interface User {
  _id: string;
  username: string;
  fullName: string;
  avatar?: string;
}

interface Conversation {
  _id: string;
  participants: User[];
  // Optional fields like lastMessage etc.
}

interface Props {
  selectedUser: string | null;
  onSelectUser: (userId: string) => void;
  currentUserId: string;
}

export default function UserList({ selectedUser, onSelectUser, currentUserId }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchConversations = async () => {
    console.log("Fetching conversations...");
    try {
      const response = await axios.get("http://localhost:8001/api/v1/conversations", {
        withCredentials: true,
      });
      setConversations(response.data.data);
    } catch (error) {
      console.error("Failed to fetch conversations", error);
    }
  }
   

  // Fetch conversations
  useEffect(() => {
    fetchConversations();

    socket.on("message", () => {
      console.log("New message received, fetching conversations again.");
      return fetchConversations();
    });



  
}, []);


  // Debounced search
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      fetch(
        `http://localhost:8001/api/v1/search/users?query=${encodeURIComponent(search)}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Search results:", data);
          setSearchResults(data);
        })
        .catch((err) => console.error("Failed to search users", err));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  // Extract the "other participant" in each conversation

  console.log("Current user ID:", currentUserId);
  const chatUsers: User[] = conversations
    .map((conv) => conv.participants.find((p) => p._id !== currentUserId))
    .filter(Boolean) as User[];

    console.log("Chat users:", chatUsers);

  return (
    <div className="w-1/4 border-r p-4 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <ul className="mt-4 space-y-2">
        {(isSearching ? searchResults : chatUsers).map((user) => (
          <li
            key={user._id}
            onClick={() => onSelectUser(user._id)}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-blue-100 ${
              selectedUser === user._id ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            <img
              src={user.avatar || "https://via.placeholder.com/40"}
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div>{user.fullName}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </li>
        ))}
        {isSearching && searchResults.length === 0 && (
          <li className="text-gray-500">No users found.</li>
        )}
      </ul>
    </div>
  );
}

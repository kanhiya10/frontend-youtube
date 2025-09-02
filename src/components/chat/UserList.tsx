import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket";
import { useTheme } from "../../context/themeContext"; // Import useTheme
import { Conversation, UserType } from "../../types/types";
import { getUserConversations } from "../../services/chats"; // Import the API service
import { searchUsers } from "../../services/searchApi"; // Import the API service
import { useStyles } from "../../utils/styleImports";





interface Props {
  selectedUser: string | null;
  onSelectUser: (userId: string) => void;
  currentUserId: string;
}

export default function UserList({ selectedUser, onSelectUser, currentUserId }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [error, setError] = useState<string>("");

  // Use the theme context
  const { theme } = useTheme();
  const { containerStylev1, inputStyle, listItemSelectedStyle, listItemDefaultStyle, listItemHoverStyle, errorStyle, loadingStyle } = useStyles();

  const fetchConversations = async () => {
    console.log("Fetching conversations...");
    setIsLoadingConversations(true);
    setError("");

    try {
      const response = await getUserConversations();
      setConversations(response.data.data);
    } catch (error: any) {
      console.error("Failed to fetch conversations", error);
      setError("Failed to load conversations");
    } finally {
      setIsLoadingConversations(false);
    }
  };

  useEffect(() => {
    fetchConversations();

    const handleNewMessage = () => {
      console.log("New message received, fetching conversations again.");
      fetchConversations();
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      setIsLoadingSearch(false);
      return;
    }

    setIsSearching(true);
    setIsLoadingSearch(true);

    const timeout = setTimeout(async () => {
      try {
        const response = await searchUsers(search);
        console.log("Search results:", response.data);
        setSearchResults(response.data);
        setError("");
      } catch (err: any) {
        console.error("Failed to search users", err);
        setError("Failed to search users");
        setSearchResults([]);
      } finally {
        setIsLoadingSearch(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const chatUsers: UserType[] = conversations
    .map((conv) => conv.participants.find((p) => p._id !== currentUserId))
    .filter(Boolean) as UserType[];

  return (
    <div className="w-1/4 border-r p-4" style={containerStylev1}>
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        style={inputStyle}
        disabled={isLoadingConversations}
      />

      {error && (
        <div className="mb-4 p-2 rounded border text-sm" style={errorStyle}>
          {error}
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {isLoadingConversations ? (
          <li className="flex items-center justify-center p-4" style={loadingStyle}>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Loading conversations...
          </li>
        ) : isSearching ? (
          <>
            {isLoadingSearch ? (
              <li className="flex items-center justify-center p-4" style={loadingStyle}>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Searching users...
              </li>
            ) : (
              <>
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => onSelectUser(user._id)}
                    className={`flex items-center gap-2 p-2 cursor-pointer rounded transition-colors duration-200`}
                    style={
                      selectedUser === user._id
                        ? listItemSelectedStyle
                        : listItemDefaultStyle
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = selectedUser === user._id ? theme.active : theme.hover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = selectedUser === user._id ? theme.active : 'transparent';
                    }}
                  >
                    <img
                      src={user.avatar || "https://via.placeholder.com/40"}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div>{user.fullName}</div>
                      <div className="text-sm" style={{ color: theme.textMuted }}>
                        @{user.username}
                      </div>
                    </div>
                  </li>
                ))}
                {searchResults.length === 0 && (
                  <li className="p-2 text-center" style={loadingStyle}>
                    No users found.
                  </li>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {chatUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => onSelectUser(user._id)}
                className={`flex items-center gap-2 p-2 cursor-pointer rounded transition-colors duration-200`}
                style={
                  selectedUser === user._id
                    ? listItemSelectedStyle
                    : listItemDefaultStyle
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = selectedUser === user._id ? theme.active : theme.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = selectedUser === user._id ? theme.active : 'transparent';
                }}
              >
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div>{user.fullName}</div>
                  <div className="text-sm" style={{ color: theme.textMuted }}>
                    @{user.username}
                  </div>
                </div>
              </li>
            ))}
            {chatUsers.length === 0 && (
              <li className="p-4 text-center" style={loadingStyle}>
                No conversations yet. Search for users to start chatting!
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
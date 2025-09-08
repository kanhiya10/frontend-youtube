import { useEffect, useState } from "react";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import socket from "../../socket";
import { getCurrentUser } from "../../services/users"; // Import the API service
import { UserType } from "@/types/types";


export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        const response = await getCurrentUser();
        setCurrentUser(response.data.data);
        
        // Uncomment if you want to register with socket
        // socket.emit("register", response.data.data._id);
      } catch (err: any) {
        console.error("Failed to fetch current user", err);
        setError("Failed to load user data. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();

    // Cleanup function
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>No user data available</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex h-screen">
      <UserList
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        currentUserId={currentUser._id}
      />
      <ChatWindow selectedUser={selectedUser} currentUserId={currentUser._id} />
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import socket from "../../socket";

interface User {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
}

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
 




useEffect(() => {
  axios
    .get<{ data: User }>("https://backend-youtube-zba1.onrender.com/api/v1/users/current-user", {
      withCredentials: true,
    })
    .then((res) => {
      setCurrentUser(res.data.data);
      // console.log("Current user fetched in chatLayout:", res.data.data);
      // socket.emit("register", res.data.data._id);
    })
    .catch((err) => console.error("Failed to fetch current user", err));

  // return () => {
  //   socket.disconnect();
  // };
}, []);


  if (!currentUser) {
    return <div>Loading...</div>;
  }

  console.log("Current userId in parent :", currentUser);

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

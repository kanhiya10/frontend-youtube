import { useEffect, useState } from "react";
import socket from "../../socket";
import MessageItem from "./MessageItem";
import axios from "axios";
import chat from "../../assets/images/chat.jpg";

interface Props {
  selectedUser: string | null;
  currentUserId: string;
}


interface ChatMessage {
  from: string;
  to: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'file';
}

interface UserType {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
}

export default function ChatWindow({ selectedUser, currentUserId }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    setMessages([]);
    if (!selectedUser) {
      setConversationId(null);
      return;
    }

    axios
      .get(`https://backend-youtube-zba1.onrender.com/api/v1/conversations/between/${selectedUser}`, { withCredentials: true })
      .then(res => {
        const conv = res.data.data;
        setConversationId(conv._id);
        return axios.get(`https://backend-youtube-zba1.onrender.com/api/v1/conversations/${conv._id}/messages`, { withCredentials: true });
      })
      .then(res => setMessages(res?.data?.data || []))
      .catch(err => {
        if (err.response?.status === 404) {
          console.log("No previous conversation");
          setConversationId(null);
        } else {
          console.error("Failed fetching chat history", err);
        }
      });
  }, [selectedUser]);


  useEffect(() => {
    socket.emit("register", currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    setMessages([]);
  }, [selectedUser]);


  if (!conversationId) {
    console.log("Conversation will be created after sending first message.");
  }




  console.log("Current user ID:", currentUserId);

  // ✅ Listen for incoming messages
  useEffect(() => {
    const handleMessage = (msg: ChatMessage) => {
      if (
        currentUserId &&
        (
          (msg.from === currentUserId && msg.to === selectedUser) ||
          (msg.from === selectedUser && msg.to === currentUserId)
        )
      ) {
        setMessages((prev) => [...prev, msg]);
      }

      console.log("Received message:", msg);
    };

    socket.on("message", handleMessage);
    return () => socket.off("message", handleMessage);
  }, [selectedUser, currentUserId]);

  // ✅ Send message
  const sendMessage = () => {
    if (!input.trim() || !selectedUser || !currentUserId) return;

    const newMsg: ChatMessage = {
      from: currentUserId,
      to: selectedUser,
      text: input,
    };

    console.log("Sending message:", newMsg);

    socket.emit("sendMessage", newMsg);
    setMessages((prev) => [...prev, newMsg]); // optimistic update
    setInput("");
  };

  const sendMedia = async (file: File) => {
    if (!file || !selectedUser || !currentUserId) return;

    const formData = new FormData();
    formData.append('mediaFile', file);

    try {
      const res = await axios.post('https://backend-youtube-zba1.onrender.com/api/v1/conversations/uploadMedia', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      console.log("Media uploaded:", res.data);

      const newMsg: ChatMessage = {
        from: currentUserId,
        to: selectedUser,
        mediaUrl: res.data.url,
        mediaType: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'file',
      };

      console.log("Sending media message to kafka:", newMsg);

      socket.emit("sendMessage", newMsg);
      setMessages((prev) => [...prev, newMsg]);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <img
          src={chat}
          alt="Chat placeholder"
          className="w-1/3 max-w-[200px] mb-4 opacity-80 drop-shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <p className="text-sm text-center text-gray-400">Start a conversation!</p>
      </div>

    );
  }

  return (
    <div className="flex-1 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-2 border-b pb-2">
        Chat with {selectedUser}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50">
        {messages.map((msg, i) => (
          <MessageItem
            key={i}
            text={msg.text}
            isSender={msg.from === currentUserId}
            mediaUrl={msg.mediaUrl}
            mediaType={msg.mediaType}
          />
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <input
          className="border rounded px-3 py-2"
         type="file"  onChange={(e) => {
          if (e.target.files?.[0]) sendMedia(e.target.files[0]);
        }} />

        <button
          className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

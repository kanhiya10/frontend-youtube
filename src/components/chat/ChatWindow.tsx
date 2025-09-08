import { useEffect, useState } from "react";
import socket from "../../socket";
import MessageItem from "./MessageItem";
import chat from "../../assets/images/chat.jpg";
import { useTheme } from "../../context/themeContext";
import { 
  getConversationBetween, 
  getConversationMessages, 
  uploadMediaFile 
} from "../../services/chats"; // Import the API services
import { ChatMessage } from "../../types/types";
import { useStyles } from "../../utils/styleImports";

interface Props {
  selectedUser: string | null;
  currentUserId: string;
}



export default function ChatWindow({ selectedUser, currentUserId }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);

  // Use the theme context
  const { theme } = useTheme();
  const { loadingStyle, windowStyle, headerStyle, messageListStyle, inputStylev1, fileInputStylev1 } = useStyles();

  useEffect(() => {
    const loadConversationHistory = async () => {
      setMessages([]);
      if (!selectedUser) {
        setConversationId(null);
        return;
      }

      setIsLoading(true);
      try {
        // Get conversation between users
        const conversationResponse = await getConversationBetween(selectedUser);
        const conversation = conversationResponse.data.data;
        setConversationId(conversation._id);
        
        // Get messages for this conversation
        const messagesResponse = await getConversationMessages(conversation._id);
        setMessages(messagesResponse.data.data || []);
      } catch (error: any) {
        if (error.response?.status === 404) {
          setConversationId(null);
        } else {
          console.error("Failed fetching chat history", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadConversationHistory();
  }, [selectedUser]);

  useEffect(() => {
    socket.emit("register", currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    setMessages([]);
  }, [selectedUser]);

  if (!conversationId) {
  }


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
    };

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [selectedUser, currentUserId]);

  const sendMessage = () => {
    if (!input.trim() || !selectedUser || !currentUserId) return;
    const newMsg: ChatMessage = {
      from: currentUserId,
      to: selectedUser,
      text: input,
    };
    socket.emit("sendMessage", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const sendMedia = async (file: File) => {
    if (!file || !selectedUser || !currentUserId) return;
    
    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append('mediaFile', file);
      
      const response = await uploadMediaFile(formData);
      
      const newMsg: ChatMessage = {
        from: currentUserId,
        to: selectedUser,
        mediaUrl: response.data.url,
        mediaType: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'file',
      };
      
      socket.emit("sendMessage", newMsg);
      setMessages((prev) => [...prev, newMsg]);
    } catch (error) {
      console.error("Failed to upload file:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsUploadingMedia(false);
    }
  };


  const buttonStyle = {
    backgroundColor: theme.primary,
    color: theme.btn,
    opacity: isUploadingMedia ? 0.7 : 1
  };


  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center" style={windowStyle}>
        <img
          src={chat}
          alt="Chat placeholder"
          className="w-1/3 max-w-[200px] mb-4 opacity-80 drop-shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <p className="text-sm text-center" style={loadingStyle}>Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 flex flex-col" style={windowStyle}>
      <h2 className="text-lg font-semibold mb-2 border-b pb-2" style={headerStyle}>
        Chat with {selectedUser}
      </h2>
      
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded" style={messageListStyle}>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2" style={{ color: theme.textMuted }}>Loading messages...</span>
          </div>
        ) : (
          messages.map((msg, i) => (
            <MessageItem
              key={i}
              text={msg.text}
              isSender={msg.from === currentUserId}
              mediaUrl={msg.mediaUrl}
              mediaType={msg.mediaType}
            />
          ))
        )}
      </div>
      
      <div className="flex mt-4 gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={inputStylev1}
          disabled={isUploadingMedia}
        />
        <input
          className="border rounded px-3 py-2"
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) sendMedia(e.target.files[0]);
          }}
          style={fileInputStylev1}
          disabled={isUploadingMedia}
        />
        <button
          className="text-white px-4 rounded transition-opacity duration-200 disabled:cursor-not-allowed"
          onClick={sendMessage}
          style={buttonStyle}
          disabled={isUploadingMedia || (!input.trim())}
        >
          {isUploadingMedia ? 'Uploading...' : 'Send'}
        </button>
      </div>
      
      {isUploadingMedia && (
        <p className="text-xs mt-2 text-center" style={{ color: theme.textMuted }}>
          Uploading media file...
        </p>
      )}
    </div>
  );
}
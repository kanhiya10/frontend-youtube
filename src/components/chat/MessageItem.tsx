import { useTheme } from "../../context/themeContext"; // Import useTheme
import React from "react";
import { MessageProps } from "../../types/types";



export default function MessageItem({ text, isSender, mediaUrl, mediaType }: MessageProps) {
  // Use the theme context
  const { theme } = useTheme();

  // Define dynamic styles based on sender/receiver status
  const messageStyle = {
    backgroundColor: isSender ? theme.primary : theme.borderLight, // Using 'primary' for sender and 'borderLight' for receiver
    color: isSender ? theme.btn : theme.text, // Using 'btn' for sender text and 'text' for receiver text
  };

  const fileLinkStyle = {
    color: isSender ? theme.background : theme.info, // Using 'background' for sender link and 'info' for receiver link
  };

  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} my-1`}
    >
      <div
        className={`p-3 rounded-lg text-sm max-w-[70%] shadow-md space-y-2 ${
          isSender ? "rounded-br-none" : "rounded-bl-none"
        }`}
        style={messageStyle}
      >
        {/* 📸 Render image */}
        {mediaType === "image" && mediaUrl && (
          <img
            src={mediaUrl}
            alt="sent-media"
            className="rounded-md max-w-full max-h-60 object-cover"
          />
        )}

        {/* 🎥 Render video */}
        {mediaType === "video" && mediaUrl && (
          <video controls className="rounded-md max-w-full max-h-60">
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* 📄 Render file link */}
        {mediaType === "file" && mediaUrl && (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-words"
            style={fileLinkStyle}
          >
            📎 Download File
          </a>
        )}

        {/* 💬 Render text */}
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
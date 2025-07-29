interface Props {
  text?: string;
  isSender: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'file';
}

export default function MessageItem({ text, isSender, mediaUrl, mediaType }: Props) {
  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} my-1`}
    >
      <div
        className={`p-3 rounded-lg text-sm max-w-[70%] ${
          isSender
            ? "bg-purple-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        } shadow-md space-y-2`}
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
            className="underline text-blue-700 break-words"
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

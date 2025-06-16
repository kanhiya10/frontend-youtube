import React from "react";

interface ReplyItemProps {
  reply: any;
  onReplyToReply: (username: string, parentId: string) => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply, onReplyToReply }) => {
  const handleReplyClick = () => {
    const firstName = reply.user.fullName.split(" ")[0];
    onReplyToReply(firstName, reply._id);
  };

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2 mb-1 text-sm text-gray-600 dark:text-gray-400">
        <img src={reply.user.avatar} className="w-6 h-6 rounded-full" />
        <span className="font-semibold">{reply.user.fullName}:</span> {reply.text}
      </div>
      <button onClick={handleReplyClick} className="text-xs text-blue-500 ml-8">
        Reply
      </button>

      {/* Render nested replies recursively */}
      {reply.replies?.length > 0 && (
        <div className="ml-4 mt-2">
          {reply.replies.map((nestedReply: any) => (
            <ReplyItem
              key={nestedReply._id}
              reply={nestedReply}
              onReplyToReply={onReplyToReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default ReplyItem;

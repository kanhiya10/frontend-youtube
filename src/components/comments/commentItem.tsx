import React, { useState } from 'react';
import CommentForm from './commentForm';
import { useCommentLike } from '../../hooks/useCommentLike';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ReplyItem from './replyItem'; // import new component

interface CommentItemProps {
  comment: any;
  videoId: string;
  onReply: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, videoId, onReply }) => {
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [activeParentId, setActiveParentId] = useState(comment._id); // default to main comment


  const { info } = useSelector((state: RootState) => state.User);


  const {
    likes,
    dislikes,
    userLiked,
    userDisliked,
    toggleLike,
    toggleDislike,
  } = useCommentLike({
    initialLikes: comment.likes,
    initialDislikes: comment.dislikes || [],
    commentId: comment._id,
    currentUserId: info?.id ?? '',
  });

  console.log('activeParentId',activeParentId);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
     await fetch(`${import.meta.env.VITE_API_URL}/api/v1/comments/${activeParentId}/reply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ text: replyText, videoId }),
});

      setReplyText('');
      setReplyBoxOpen(false);
      onReply(); // refresh
    } catch (err) {
      console.error('Error submitting reply', err);
    }
  };

  const handleOpenReply = (username?: string, parentId?: string) => {
    setReplyBoxOpen(true);
    setActiveParentId(parentId || comment._id);
    setReplyText(username ? `@${username} ` : `@${comment.user.fullName.split(" ")[0]} `);
  };

  return (
    <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <img src={comment.user.avatar} className="w-8 h-8 rounded-full" />
        <span className="font-medium text-gray-800 dark:text-white">{comment.user.fullName}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>

      <button
        onClick={() => handleOpenReply()}
        className="text-xs text-blue-500"
      >
        {replyBoxOpen ? 'Cancel' : 'Reply'}
      </button>

      {replyBoxOpen && (
        <div className="mt-2">
          <CommentForm
            value={replyText}
            setValue={setReplyText}
            onSubmit={handleReplySubmit}
            placeholder="Write a reply..."
          />
        </div>
      )}

     {comment.replies?.length > 0 && (
  <div className="ml-6 mt-2 space-y-2">
    {comment.replies.map((reply: any) => (
      <ReplyItem
        key={reply._id}
        reply={reply}
        onReplyToReply={(username, parentId) => handleOpenReply(username, parentId)}
      />
    ))}
  </div>
)}


      <div className="flex gap-4 mt-2 text-sm">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1 ${userLiked ? 'text-blue-500' : 'text-gray-500'}`}
        >
          👍 {likes}
        </button>
        <button
          onClick={toggleDislike}
          className={`flex items-center gap-1 ${userDisliked ? 'text-red-500' : 'text-gray-500'}`}
        >
          👎 {dislikes}
        </button>
      </div>
    </div>
  );
};

export default CommentItem;

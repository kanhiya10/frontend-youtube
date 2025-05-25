import React, { useState } from 'react';
import CommentForm from './commentForm';
import { useCommentLike } from '../../hooks/useCommentLike';
import { UserApi } from '@/features/slice/fetchUser.slice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface CommentItemProps {
  comment: any;
  videoId: string;
  onReply: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, videoId, onReply }) => {
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

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
  currentUserId: info?.id ?? '', // You need to pass this
});

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      await fetch(`http://localhost:8000/api/v1/comments/${comment._id}/reply`, {
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

  return (
    <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <img src={comment.user.avatar} className="w-8 h-8 rounded-full" />
        <span className="font-medium text-gray-800 dark:text-white">{comment.user.fullName}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>

      <button
        className="text-sm text-blue-500 mt-1"
        onClick={() => setReplyBoxOpen(!replyBoxOpen)}
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
            <div key={reply._id} className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{reply.user.fullName}:</span> {reply.text}
            </div>
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

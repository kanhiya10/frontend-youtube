import React, { useState } from 'react';
import CommentForm from './commentForm';
import { useCommentLike } from '../../hooks/useCommentLike';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ReplyItem from './replyItem';
import { useTheme } from '../../context/themeContext';
import { replyToComment } from '../../services/videos';
import { useStyles } from '../../utils/styleImports';

interface CommentItemProps {
  comment: any;
  videoId: string;
  onReply: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, videoId, onReply }) => {
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [activeParentId, setActiveParentId] = useState(comment._id);

  const { theme } = useTheme();
  const { cardStyle, headingStyle, labelStyle, replyButton, repliesSection } = useStyles();
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


  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      await replyToComment(activeParentId, replyText, videoId);

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

  

  const likeButtonStyle: React.CSSProperties = {
    color: userLiked ? theme.info : theme.textMuted
  };

  const dislikeButtonStyle: React.CSSProperties = {
    color: userDisliked ? theme.error : theme.textMuted
  };



  return (
    <div className="mb-4 p-3 rounded-lg border" style={cardStyle}>
      <div className="flex items-center gap-2 mb-1">
        <img src={comment.user.avatar} className="w-8 h-8 rounded-full" />
        <span className="font-medium" style={headingStyle}>
          {comment.user.fullName}
        </span>
      </div>
      
      <p style={labelStyle}>
        {comment.text}
      </p>

      <button
        onClick={() => handleOpenReply()}
        className="text-xs transition-colors duration-200 hover:opacity-75"
        style={replyButton}
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
        <div 
          className="ml-6 mt-2 space-y-2 pl-4 border-l-2" 
          style={repliesSection}
        >
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
          className="flex items-center gap-1 transition-colors duration-200 hover:opacity-75"
          style={likeButtonStyle}
        >
          👍 {likes}
        </button>
        <button
          onClick={toggleDislike}
          className="flex items-center gap-1 transition-colors duration-200 hover:opacity-75"
          style={dislikeButtonStyle}
        >
          👎 {dislikes}
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
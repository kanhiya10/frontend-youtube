import React from 'react';
import CommentItem from './commentItem';

interface CommentListProps {
  comments: any[];
  videoId: string;
  refreshComments: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, videoId, refreshComments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          videoId={videoId}
          onReply={refreshComments}
        />
      ))}
    </div>
  );
};

export default CommentList;

import React, { useEffect, useState } from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList';
import { VideoInfoType } from '../../types/types';
import { useTheme } from '../../context/themeContext';
import { getVideoComments, writeComment } from '../../services/videos';

interface VideoCommentsProps {
  VideoId: string;
}

const VideoComments: React.FC<VideoCommentsProps> = ({ VideoId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const { theme } = useTheme();

  const fetchComments = async () => {
    if (!VideoId) return;
    try {
      const res = await getVideoComments(VideoId);
      console.log('Fetched comments:', res.data.data);
      setComments(res.data.data);
    } catch (err) {
      console.error('Error fetching comments', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [VideoId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await writeComment(newComment, VideoId);
      setNewComment('');
      fetchComments(); // refresh list
    } catch (err) {
      console.error('Error submitting comment', err);
    }
  };

  return (
    <div className="w-[70%] mt-4">
      <CommentForm
        value={newComment}
        setValue={setNewComment}
        onSubmit={handleCommentSubmit}
        placeholder="Write your comment..."
      />
      <h2 className="text-lg font-semibold mb-2 " style={{color:theme.secondary}}>Comments</h2>
      <CommentList
        comments={comments}
        videoId={VideoId}
        refreshComments={fetchComments}
      />
    </div>
  );
};

export default VideoComments;
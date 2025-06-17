import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './commentForm';
import CommentList from './commentList';
import { VideoInfoType } from '../../types/types';

interface VideoCommentsProps {
  VideoInfo: VideoInfoType;
}

const VideoComments: React.FC<VideoCommentsProps> = ({ VideoInfo }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    if (!VideoInfo._id) return;
    try {
      const res = await axios.get(`https://backend-youtube-zba1.onrender.com/api/v1/comments/readComment/${VideoInfo._id}`);
      console.log('Fetched comments:', res.data.data);
      setComments(res.data.data);
    } catch (err) {
      console.error('Error fetching comments', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [VideoInfo._id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        'https://backend-youtube-zba1.onrender.com/api/v1/comments/writeComment',
        {
          text: newComment,
          videoId: VideoInfo._id,
        },
        { withCredentials: true }
      );
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
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Comments</h2>
      <CommentList
        comments={comments}
        videoId={VideoInfo._id}
        refreshComments={fetchComments}
      />
    </div>
  );
};

export default VideoComments;

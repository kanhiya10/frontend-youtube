import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VideoInfoType } from '../../types/types';

interface CommentProps {
  VideoInfo: VideoInfoType;
}

const VideoComments: React.FC<CommentProps> = ({ VideoInfo }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyBoxOpen, setReplyBoxOpen] = useState<string | null>(null);
const [replyText, setReplyText] = useState('');



  console.log('VideoInfo id inside videoComments:', VideoInfo._id);


  useEffect(() => {
    const fetchComments = async () => {
    if (!VideoInfo._id) return;
      try {
        console.log('Fetching comments for video ID:', VideoInfo._id);
        const res = await axios.get(`http://localhost:8000/api/v1/comments/readComment/${VideoInfo._id}`);
        setComments(res.data.data);
      } catch (err) {
        console.error('Error fetching comments', err);
      }
    };

    fetchComments();
  }, [VideoInfo._id]);

  
const handleCommentSubmit = async () => {
  if (!newComment.trim()) return;

  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/comments/writeComment`,
      {
        text: newComment,
        videoId: VideoInfo._id,
      },
      { withCredentials: true } // important if using cookies for auth
    );

    // Add the new comment to the top of the list
    setComments([res.data.data, ...comments]);
    setNewComment('');
  } catch (err) {
    console.error('Error submitting comment', err);
  }
};

const handleReplySubmit = async (parentCommentId: string) => {
  if (!replyText.trim()) return;

  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/comments/${parentCommentId}/reply`,
      {
        text: replyText,
        videoId: VideoInfo._id,
      },
      { withCredentials: true }
    );

    setReplyText('');
    setReplyBoxOpen(null);

    // Refresh comments
    const updatedRes = await axios.get(`http://localhost:8000/api/v1/comments/readComment/${VideoInfo._id}`);
    setComments(updatedRes.data.data);
  } catch (err) {
    console.error('Error submitting reply', err);
  }
};



  return (
    <div className="w-[70%] mt-4">
      <div className="mb-4">
  <textarea
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    placeholder="Write your comment..."
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
    rows={3}
  />
  <button
    onClick={handleCommentSubmit}
    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Post Comment
  </button>
</div>

      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <img src={comment.user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <span className="font-medium text-gray-800 dark:text-white">{comment.user.fullName}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          
          {/* Toggle reply input for this comment */}
<button
  className="text-sm text-blue-500 mt-1"
  onClick={() => setReplyBoxOpen(replyBoxOpen === comment._id ? null : comment._id)}
>
  {replyBoxOpen === comment._id ? 'Cancel' : 'Reply'}
</button>

{/* Reply textarea */}
{replyBoxOpen === comment._id && (
  <div className="mt-2">
    <textarea
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
      placeholder="Write a reply..."
      className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
    />
    <button
      onClick={() => handleReplySubmit(comment._id)}
      className="mt-1 px-3 py-1 text-sm bg-blue-600 text-white rounded"
    >
      Submit Reply
    </button>
  </div>
)}


          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-2 space-y-2">
              {comment.replies.map((reply: any) => (
                <div key={reply._id} className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">{reply.user.fullName}:</span> {reply.text}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoComments;

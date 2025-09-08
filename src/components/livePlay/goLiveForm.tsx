import React, { useState } from 'react';
import axios from 'axios';
import LiveStreamPlayer from './liveStreamPlayer';



const GoLiveForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [streamKey, setStreamKey] = useState('');


  const handleGoLive = async () => {
    try {
      const res = await axios.post('https://backend-youtube-zba1.onrender.com/api/v1/stream/start', { title, category }, {
        withCredentials: true, // if using cookies for auth
      });
      setStreamKey(res.data.data.streamKey);
    } catch (err) {
      console.error('Failed to start stream:', err);
    }
  };

  const handleStopStream = async () => {
    try {
      const res = await axios.post('https://backend-youtube-zba1.onrender.com/api/v1/stream/stop', {}, {
        withCredentials: true,
      });
      setStreamKey('');
    } catch (err) {
      console.error('Failed to stop stream:', err);
    }
  };

  return (
    <div className="p-4 rounded border shadow">
      <h2 className="text-xl font-semibold mb-2">Start Live Stream</h2>
      <input
        type="text"
        placeholder="Stream Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleGoLive}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go Live
      </button>

      {streamKey && (
        <div className="mt-4">
          <p><strong>Use this Stream Key in OBS:</strong></p>
          <code className="bg-gray-200 px-2 py-1 rounded">{streamKey}</code>
          <p className="text-sm text-gray-600 mt-1">RTMP URL: rtmp://yourserver/live</p>
          <LiveStreamPlayer streamKey={streamKey} />
          <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={handleStopStream}>Stop Stream</button>
        </div>
      )}
    </div>
  );
};

export default GoLiveForm;

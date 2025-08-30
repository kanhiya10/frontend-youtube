import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoLiveForm from '../livePlay/goLiveForm';
import LiveStreamPlayer from '../livePlay/liveStreamPlayer';
import { useParams } from 'react-router-dom';

interface StreamMeta {
  streamKey: string;
  isLive: boolean;
  title: string;
  category: string;
}

interface PastStream {
  _id: string;
  title: string;
  category: string;
  startedAt: string;
  endedAt: string;
}

const Live = () => {
  const { username } = useParams<{ username: string }>();
  const isCurrentUser = !username;

  const [streamData, setStreamData] = useState<StreamMeta | null>(null);
  const [pastStreams, setPastStreams] = useState<PastStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveAndPast = async () => {
      try {
        if (!isCurrentUser) {
            console.log("username in fetchLiveAndPast",username);
          const liveRes = await axios.get(`https://backend-youtube-zba1.onrender.com/api/v1/stream/fetchLive/${username}`, {
            withCredentials: true,
          });
          setStreamData(liveRes.data.data);
        }

        const historyRes = await axios.get(
            `https://backend-youtube-zba1.onrender.com/api/v1/stream/history${username ? `/${username}` : ""}`,
            { withCredentials: true }
          );
          
        console.log("historyRes",historyRes.data.data);
        setPastStreams(historyRes.data.data);
      } catch (err) {
        console.error('Error fetching stream data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveAndPast();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {isCurrentUser ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Go Live</h2>
          <GoLiveForm />
        </>
      ) : (
        streamData?.isLive && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">{streamData.title}</h2>
            <p className="text-gray-600 mb-4">Category: {streamData.category}</p>
            <LiveStreamPlayer streamKey={streamData.streamKey} />
          </div>
        )
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Past Live Streams</h2>
        {pastStreams.length === 0 ? (
          <p className="text-gray-600">No past live streams found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastStreams.map((stream) => (
              <li
                key={stream._id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold">{stream.title}</h3>
                <p className="text-sm text-gray-500">Category: {stream.category}</p>
                <p className="text-sm text-gray-500">
                  Started: {new Date(stream.startedAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Ended: {new Date(stream.endedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Live;

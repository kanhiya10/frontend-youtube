import React, { useEffect, useState } from "react";
import axios from "axios";
import LiveStreamPlayer from "./liveStreamPlayer";
interface PastStream {
  streamKey: string;
  title: string;
  category: string;
  isLive: boolean;
//   startedAt: string;
//   endedAt: string;
}

const PastLiveStreams = ({ username }: { username: string }) => {
  const [pastStreams, setPastStreams] = useState<PastStream[]>([]);

  useEffect(() => {
    const fetchPast = async () => {
      try {
        const res = await axios.get(
          `${https://backend-youtube-zba1.onrender.com}/api/v1/stream/history/${username}`
        );
        console.log("res",res.data);
        setPastStreams(res.data.data);
      } catch (err) {
        console.error("Error fetching past streams", err);
      }
    };

    fetchPast();
  }, [username]);

  if (pastStreams.length === 0) return <p>No past streams available.</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mt-6 mb-2">Past Live Streams</h3>
      <ul className="space-y-4">
        {pastStreams.map((stream) => (
          <li key={stream.streamKey} className="border p-4 rounded-md shadow">
            <h4 className="text-lg font-bold">{stream.title}</h4>
            <p>Category: {stream.category}</p>
            {/* <p>
              From: {new Date(stream.startedAt).toLocaleString()} <br />
              To: {new Date(stream.endedAt).toLocaleString()}
            </p> */}
            <LiveStreamPlayer streamKey={stream.streamKey} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastLiveStreams;

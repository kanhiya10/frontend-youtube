import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { VideoInfoType } from "../../types/types";

const WatchHistory = () => {

    const [history, setHistory] = useState<VideoInfoType[]>([]);
    const [loading, setLoading] = useState(true);

      const fetchHistory = async () => {
        console.log("fetchHistory called");

        try {
            const response = await axios.get(
                `https://backend-youtube-zba1.onrender.com/api/v1/users/GetHistory`,
                {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true
                  }
            );
            setHistory(response.data.data);
        } catch (error) {
            console.error("Error fetching watch history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    console.log("history",history);


    

    return (
        history.length > 0 ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          {history.map((video) => (
            <div key={video._id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-1/2">
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <p className="text-gray-600">{video.description}</p>
                <p className="text-gray-500">Uploaded on: {new Date(video.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
    ):(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">No Watch History</h1>
        <p className="text-gray-600">You have not watched any videos yet.</p>
        </div>
    )
    )
    }
    export default WatchHistory;
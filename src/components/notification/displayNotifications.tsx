import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { VideoInfoType } from "../../types/types";

interface Notification {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  type: 'videoUpload' | 'like' | 'comment' | 'subscription';
  actor?: {
    _id: string;
    username: string;
  };
  data?: {
    video:VideoInfoType;
  };
}


const DisplayNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();

    const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:8001/api/v1/notifications/fetchUserNotifications', {
          withCredentials: true,
        });
        console.log("Fetched notifications:", res.data.data);
        setNotifications(res.data.data);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;
  // if (notifications.length === 0) return <p>No notifications yet.</p>;
  // dummy-notification


   const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/v1/subscription/user", {
          withCredentials: true,
        });
        console.log("Fetched subscriptions:", res.data);
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
      } finally {
        setLoading(false);
      }
    };

    const dummyNotification = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/v1/notifications/dummy-notification", {
          withCredentials: true,
        });
        console.log("Dummy notification response:", res.data);
      } catch (error) {
        console.error("Failed to send dummy notification", error);
      }
    } 

    const checkForeground = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/v1/notifications/dummy-to-myself", {
          withCredentials: true,
        });
        console.log("Check foreground response:", res.data);
      } catch (error) { 
        console.error("Failed to check foreground", error);
      }
    }

  return (
    <div className="w-full min-h-screen p-5" style={{ background: theme.background }}>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n) => (
          <li
            key={n._id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              backgroundColor: n.isRead ? "#f9f9f9" : "#e6f7ff",
            }}
          >
            <strong>{n.title}</strong>
            <p>{n.body}</p>
            {n.actor && <p><em>By: {n.actor.username}</em></p>}

            {n.type === "videoUpload" && n.data?.video && (
              <button
                onClick={() => navigate('/videoPlay/streaming', { state: { VideoInfo: n.data!.video } })}
                className="text-blue-500 hover:underline"
              >
                Watch Video
              </button>
            )}

            <br />
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <button
        onClick={fetchSubscriptions}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
        >Check Subscribers</button>

      <button
        onClick={dummyNotification}
        className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >Send Dummy Notification</button> 
      <button
      onClick={checkForeground}
      className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >checkForegroundNotification
      </button>
    </div>
  );
};

export default DisplayNotifications;

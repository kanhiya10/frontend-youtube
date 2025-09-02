import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { Notification } from "../../types/types";
import {
  fetchUserNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../../services/notification";
import { useStyles } from "../../utils/styleImports";

const DisplayNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const { notFoundCardStyle,containerStylev2,headingStyle,labelStyle,noVideosText,errorText } = useStyles();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetchUserNotifications();
        setNotifications(res.data.data);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notification._id ? { ...n, isRead: true } : n
          )
        );
      }
      if (notification.type === "videoUpload" && notification.data?.video) {
        navigate("/videoPlay/streaming", {
          state: { VideoInfo: notification.data.video },
        });
      }
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      await deleteAllNotifications();
      setNotifications([]);
    } catch (err) {
      console.error("Failed to delete all notifications", err);
    }
  };

  const headerTheme = {
    borderBottom: `1px solid ${theme.divider}`,
  };

  const deleteAllButtonTheme = {
    backgroundColor: theme.error,
    color: "white",
    boxShadow: `0 1px 3px ${theme.shadow}`,
  };


  const notificationItemTheme = (notification: Notification) => ({
    backgroundColor: notification.isRead ? theme.card : theme.surface,
    border: `1px solid ${theme.border}`,
    boxShadow: `0 1px 3px ${theme.shadow}`,
  });

  const emptyCardTheme = {
    ...notFoundCardStyle,
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    boxShadow: `0 4px 6px ${theme.shadow}`,
  };

  

  if (loading) {
    return (
      <div
        className="min-h-screen w-full p-5"
        style={containerStylev2}
      >
        <p
          className="text-center p-8 text-base"
          style={labelStyle}
        >
          Loading notifications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-5" style={containerStylev2}>
      {/* Header */}
      <div
        className="flex justify-between items-center mb-4 pb-3"
        style={headerTheme}
      >
        <h2
          className="text-xl font-semibold m-0"
          style={labelStyle}
        >
          Notifications
        </h2>
        {notifications.length > 0 && (
          <button
            onClick={handleDeleteAllNotifications}
            className="rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition"
            style={deleteAllButtonTheme}
          >
            Delete All
          </button>
        )}
      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <div
            className="rounded-md p-8 max-w-md w-full text-center"
            style={emptyCardTheme}
          >
            <h2
              className="text-lg font-semibold mb-2"
              style={headingStyle}
            >
              No Notifications Yet
            </h2>
            <p className="m-0" style={{ color: theme.textMuted }}>
              When you receive notifications, they'll appear here.
            </p>
          </div>
        </div>
      ) : (
        <ul className="list-none p-0 m-0">
          {notifications.map((n) => (
            <li key={n._id}>
              <div
                className="rounded-md mb-3 p-4 relative cursor-pointer transition"
                style={notificationItemTheme(n)}
                onClick={() => handleNotificationClick(n)}
              >
                <div className="pr-8">
                  <strong
                    className="text-lg font-semibold mb-1 block"
                    style={headingStyle}
                  >
                    {n.title}
                  </strong>
                  <p
                    className="my-1 leading-relaxed"
                    style={labelStyle}
                  >
                    {n.body}
                  </p>
                  {n.actor && (
                    <p
                      className="italic text-sm"
                      style={noVideosText}
                    >
                      By: {n.actor.username}
                    </p>
                  )}
                  <small
                    className="text-xs mt-2 block"
                    style={noVideosText}
                  >
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(n._id);
                  }}
                  className="absolute top-2 right-2 bg-transparent border-none text-xl font-bold cursor-pointer p-1 rounded w-7 h-7 flex items-center justify-center leading-none"
                  style={errorText}
                  title="Delete notification"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayNotifications;

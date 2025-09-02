import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useTheme } from "../../../context/themeContext";
import { Topic } from "../../../types/types";

import TopicList from "./topicList";
import { CreateTopicCard } from "./createTopic";
import { SendNotificationCard } from "./sendNotification";
import {
  getAllTopics,
  getMyTopics,
  subscribeToTopic,
  unsubscribeFromTopic,
} from "../../../services/notification";

interface SubscriptionsMap {
  [topic: string]: boolean;
}

const NotificationSettings = () => {
  const { permission, token } = useSelector(
    (state: RootState) => state.notifications
  );
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>(
    {}
  );
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTopicsAndSubs = async () => {
      try {
        const [allTopicsRes, myTopicsRes] = await Promise.all([
          getAllTopics(),
          getMyTopics(),
        ]);

        const allTopics: Topic[] = allTopicsRes.data.data.topics || [];
        const myTopics: string[] =
          myTopicsRes.data.data.topics.map((t: any) => t.name) || [];

        setTopics(allTopics);

        const subStatus: Record<string, boolean> = {};
        allTopics.forEach((t) => {
          subStatus[t.name] = myTopics.includes(t.name);
        });
        setSubscriptions(subStatus);
      } catch (err) {
        console.error("Failed to load topics:", err);
      }
    };
    fetchTopicsAndSubs();
  }, []);

  const handleTopicToggle = async (topic: string): Promise<void> => {
    if (!token) return console.error("Token not ready.");
    const isSubscribed: boolean = subscriptions[topic];
    try {
      if (isSubscribed) {
        await unsubscribeFromTopic({ token, topic });
      } else {
        await subscribeToTopic({ token, topic });
      }
      setSubscriptions((prev: SubscriptionsMap) => ({
        ...prev,
        [topic]: !isSubscribed,
      }));
    } catch (err) {
      console.error("Subscription toggle failed:", err);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <div
        className="max-w-md mx-auto p-6 rounded shadow mt-10"
        style={{ backgroundColor: theme.card, color: theme.text }}
      >
        <h1 className="text-xl font-bold mb-4">Notification Settings {token}</h1>
        <p className="mb-4" style={{ color: theme.textSecondary }}>
          Notification permission:{" "}
          <span className="font-medium" style={{ color: theme.text }}>
            {permission}
          </span>
        </p>

        {token && (
          <>
            <TopicList
              topics={topics}
              subscriptions={subscriptions}
              handleToggle={handleTopicToggle}
            />
            <CreateTopicCard topics={topics} setTopics={setTopics} />
            <SendNotificationCard />
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;

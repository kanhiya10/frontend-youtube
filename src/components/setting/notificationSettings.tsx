import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from 'firebase/messaging';
import { messaging } from '../../firebase'; // Adjust path

const VAPID_KEY = 'BF4TFslNWwWhxOeWb060JYTlx82keMX02npTdIaqlRfmUy2qfCJXd70_WJox3on_hoRxxgrbWccmzv0_WVhTjQI';
const TOPICS = ['news', 'offers', 'alerts']; // Add your desired topics

interface NotificationSettingsProps {
    authToken: string;
}

interface SubscriptionsMap {
    [topic: string]: boolean;
}

const NotificationSettings = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [token, setToken] = useState(localStorage.getItem('fcmToken') || '');
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>({});

 useEffect(() => {
  const fetchUserTopics = async () => {
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:8000/api/v1/notifications/token-topics', {
        params: { token },
        withCredentials: true
      });

      const topicList = res.data.topics || [];

      const subStatus: Record<string, boolean> = {};
      topicList.forEach((topic: string) => {
        subStatus[topic] = true;
      });
      console.log('Subscribed topics:', subStatus);

      setSubscriptions(subStatus);
    } catch (err) {
      console.error('Failed to load subscribed topics:', err);
    }
  };

  fetchUserTopics();
}, [token]);


  const handleEnableNotifications = async () => {
    const perm = await Notification.requestPermission();
    setPermission(perm);

    if (perm === 'granted') {
      const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (fcmToken) {
        setToken(fcmToken);
        localStorage.setItem('fcmToken', fcmToken);

        // Send token to backend
        await axios.post(
          'http://localhost:8000/api/v1/notifications/save-token',
          { token: fcmToken, platform: 'web' },
          {withCredentials:true}
        );
      }
    }
  };



const handleTopicToggle = async (topic: string): Promise<void> => {
    if (!token) return alert('Token not ready.');

    const isSubscribed: boolean = subscriptions[topic];

    try {
        if (isSubscribed) {
            await axios.post(
                'http://localhost:8000/api/v1/notifications/unsubscribe',
                { token, topic },
                { withCredentials: true }
            );
        } else {
            await axios.post(
                'http://localhost:8000/api/v1/notifications/subscribe',
                { token, topic },
                {withCredentials:true} 
            );
        }

        setSubscriptions((prev: SubscriptionsMap) => ({
            ...prev,
            [topic]: !isSubscribed,
        }));
    } catch (err) {
        console.error('Subscription toggle failed:', err);
    }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-xl font-bold mb-4">Notification Settings</h1>

      <button
        onClick={handleEnableNotifications}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enable Notifications
      </button>

      <div className="mb-4 text-sm">
        Notification permission: <strong>{permission}</strong>
      </div>

      {token && (
        <>
          <div className="text-xs mb-4 break-all text-green-700">
            Your FCM Token: {token}
          </div>

          <h2 className="font-semibold mb-2">Subscribe to Topics</h2>
          {TOPICS.map((topic) => (
            <div key={topic} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={topic}
                checked={subscriptions[topic] || false}
                onChange={() => handleTopicToggle(topic)}
              />
              <label htmlFor={topic} className="ml-2 capitalize">
                {topic}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NotificationSettings;

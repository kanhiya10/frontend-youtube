import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from 'firebase/messaging';
import { messaging } from '../../../firebase'; // Adjust path
// import EnableNotifications from "./enableNotification";
import TopicList from "./topicList";
import {CreateTopicCard} from "./createTopic";
import {SendNotificationCard} from './sendNotification';
import { Topic } from '../../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';



const VAPID_KEY = 'BF4TFslNWwWhxOeWb060JYTlx82keMX02npTdIaqlRfmUy2qfCJXd70_WJox3on_hoRxxgrbWccmzv0_WVhTjQI';




interface SubscriptionsMap {
  [topic: string]: boolean;
}

const NotificationSettings = () => {
  const { permission, token } = useSelector((state: RootState) => state.notifications);
  // const [token, setToken] = useState(localStorage.getItem('fcmToken') || '');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>({});

  //  const [newTopic, setNewTopic] = useState({
  //   name: '',
  //   displayName: '',
  //   description: '',
  //   icon: '',
  // });


  useEffect(() => {
    const fetchTopicsAndSubs = async () => {
      try {
        const [allTopicsRes, myTopicsRes] = await Promise.all([
          axios.get('https://backend-youtube-zba1.onrender.com/api/v1/notifications/all-topics', { withCredentials: true }),
          axios.get('https://backend-youtube-zba1.onrender.com/api/v1/notifications/my-topics', { withCredentials: true }),
        ]);

        const allTopics: Topic[] = allTopicsRes.data.data.topics || [];
        const myTopics: string[] = myTopicsRes.data.data.topics.map((t: any) => t.name);

        setTopics(allTopics);

        // build subscription map
        const subStatus: Record<string, boolean> = {};
        allTopics.forEach((t) => {
          subStatus[t.name] = myTopics.includes(t.name);
        });
        setSubscriptions(subStatus);

      } catch (err) {
        console.error('Failed to load topics:', err);
      }
    };

    fetchTopicsAndSubs();
  }, []);

  //  const generateAndSaveToken = async () => {
  //   try {
  //     const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
  //     console.log('generatefn working', fcmToken);
  //     if (fcmToken && fcmToken !== token) {
  //       setToken(fcmToken);
  //       localStorage.setItem('fcmToken', fcmToken);
  //       console.log('checking');

  //       await axios.post(
  //         'https://backend-youtube-zba1.onrender.com/api/v1/notifications/save-token',
  //         { token: fcmToken, platform: 'web' },
  //         { withCredentials: true }
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Failed to get FCM token:", err);
  //   }
  // };

  //  useEffect(() => {
  //   if (Notification.permission === 'granted' && !token) {
  //     generateAndSaveToken();
  //   }
  // }, [token]);


  //   const handleEnableNotifications = async () => {
  //   const perm = await Notification.requestPermission();
  //   setPermission(perm);
  //   console.log('manual working', perm);

  //   if (perm === 'granted') {
  //     await generateAndSaveToken();
  //   }
  // };



  const handleTopicToggle = async (topic: string): Promise<void> => {
    if (!token) return alert('Token not ready.');

    const isSubscribed: boolean = subscriptions[topic];

    try {
      if (isSubscribed) {
        await axios.post(
          'https://backend-youtube-zba1.onrender.com/api/v1/notifications/unsubscribe',
          { token, topic },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          'https://backend-youtube-zba1.onrender.com/api/v1/notifications/subscribe',
          { token, topic },
          { withCredentials: true }
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
      <h1 className="text-xl font-bold mb-4">Notification Settings {token}</h1>
{/* 
      <EnableNotifications
        permission={permission}
        handleEnableNotifications={handleEnableNotifications}
      /> */}

            <p className="mb-4 text-gray-700">
        Notification permission:{" "}
        <span className="font-medium">{permission}</span>
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
  );
};

export default NotificationSettings;

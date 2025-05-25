import { useState } from 'react'
import './App.css'
import { Route,Routes,Outlet } from 'react-router-dom';

import Home from './app/home';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';
import Search from './components/common/serach';
import Streaming from './app/videoPlay/streaming';
import AuthIndex from './app/auth/index';
import OwnerProfile from './app/videoPlay/ownerProfile';
import ProfileIndex from './app/profile/index';
import LiveStreaming from './components/common/liveStreaming';
import HomeProfile  from './components/common/homeProfile';
import VideosTab from './components/common/videoTab';
import WatchHistory from './components/common/watchHistory';
import Settings from './components/setting/settings';
import ManageProfile from './components/setting/profileSettings/index';
import SecuritySettings from './components/setting/securitySettings';
import NotificationSettings from './components/setting/notificationSettings';
import UploadVideo from './components/common/uploadVideo';
import { useEffect } from 'react';
import { messaging } from './firebase';
import { getToken,getMessaging,onMessage } from 'firebase/messaging';


function App() {
  const [sidebarData, setSidebarData] = useState(false);
  const [notification, setNotification] = useState(null);

useEffect(() => {
  function requestPermissionAndGetToken() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // ✅ Now get the FCM token here
        getToken(messaging, {
          vapidKey: 'BF4TFslNWwWhxOeWb060JYTlx82keMX02npTdIaqlRfmUy2qfCJXd70_WJox3on_hoRxxgrbWccmzv0_WVhTjQI',
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log('Token generated:', currentToken);
              localStorage.setItem('fcmToken', currentToken);
              // Send token to backend server if needed
            } else {
              console.log('No registration token available.');
            }
          })
          .catch((err) => {
            console.log('Error retrieving token:', err);
          });

      } else {
        console.log('Unable to get permission to notify.', permission);
      }
    });
  }

  requestPermissionAndGetToken();
}, []);


 useEffect(() => {
    // Foreground message listener
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });

      // Optional: show a custom toast or popup here
      alert(`${payload.notification.title}\n${payload.notification.body}`);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);


  

  const handleSideBar=()=>{
    setSidebarData(!sidebarData);
  }
 

  return (

      <div>
  <Header handleSideBar={handleSideBar} />
  <Sidebar sidebarData={sidebarData} />

  {/* Content wrapper that adjusts margin-left based on sidebar */}
  <div
    className={`mt-[4%] transition-all duration-300  ${
      sidebarData ? 'ml-[11.5rem]' : 'ml-[4.5rem]'
    }`}
  >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watchHistory" element={<WatchHistory />} />
      <Route path="/settings" element={< Settings/>} />
      <Route path="/manageProfile" element={<ManageProfile />} />
      <Route path="/manageSecurity" element={<SecuritySettings />} />
      <Route path="/manageNotifications" element={<NotificationSettings />} />
      <Route path="/videoPlay/streaming" element={<Streaming />} />
      <Route path="/auth/index" element={<AuthIndex />} />
      <Route path="/profile/index" element={<ProfileIndex />} >
      <Route index element={<HomeProfile />} />
      <Route path="live" element={<LiveStreaming/>} />
      <Route path="home" element={<HomeProfile/>} />
      <Route path="getVideo" element={<VideosTab/>} />
      <Route path="watchHistory" element={<WatchHistory />} />
      <Route path="uploadVideo" element={< UploadVideo/>} />
      </Route>
      <Route path="/videoPlay/ownerProfile/:username" element={<OwnerProfile/>} >
      <Route index element={<HomeProfile />} />
      <Route path="live" element={<LiveStreaming/>} />
      <Route path="home" element={<HomeProfile/>} />
      <Route path="getVideo" element={<VideosTab/>} />
      </Route>
    </Routes>\

     {/* {notification && (
      <div className="fixed bottom-0 right-0 m-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg z-50">
        <h2 className="text-lg font-semibold">{notification.title}</h2>
        <p>{notification.body}</p>
      </div>
    )} */}
  </div>
</div>

      
    
  )
}

export default App

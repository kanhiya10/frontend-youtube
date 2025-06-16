import { useState } from 'react'
import './App.css'
import { Route,Routes,Outlet } from 'react-router-dom';
import {lazyImport} from './utils/lazyImport';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';
import Home from './app/home';
import WatchHistory from './components/common/watchHistory';
import Settings from './components/setting/settings';
const ManageProfile = lazyImport(() => import('./components/setting/profileSettings/index'));
const SecuritySettings = lazyImport(() => import('./components/setting/securitySettings'));
const NotificationSettings = lazyImport(() => import('./components/setting/notificationSettings'));
const Streaming = lazyImport(() => import('./app/videoPlay/streaming'));
const AuthIndex = lazyImport(() => import('./app/auth/index'));
const ProfileIndex = lazyImport(() => import('./app/profile/index'));
const OwnerProfile = lazyImport(() => import('./app/videoPlay/ownerProfile'));
const HomeProfile = lazyImport(() => import('./components/common/homeProfile'));
const LiveStreaming = lazyImport(() => import('./components/common/liveStreaming'));
const VideosTab = lazyImport(() => import('./components/common/videoTab'));
const UploadVideo = lazyImport(() => import('./components/common/uploadVideo'));
import NotificationPage from './app/notifications/notificationPage';
import { useEffect,Suspense } from 'react';
import { messaging } from './firebase';
import { getToken,getMessaging,onMessage } from 'firebase/messaging';
import SearchResult from './app/search/index';

function App() {
  const [sidebarData, setSidebarData] = useState(false);
  const [notification, setNotification] = useState(null);



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
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
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
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/settings" element={< Settings/>} />
      <Route path="/manageProfile" element={<ManageProfile />} />
      <Route path="/manageSecurity" element={<SecuritySettings />} />
      <Route path="/manageNotifications" element={<NotificationSettings />} />
      <Route path="/videoPlay/streaming" element={<Streaming />} />
      <Route path="/auth/index" element={<AuthIndex />} />
      <Route path="/search" element={<SearchResult />} />
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
  </Suspense>
</div>

      
    
  )
}

export default App

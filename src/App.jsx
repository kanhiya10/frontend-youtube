import { useState } from 'react'
import './App.css'
import { Route, Routes, Outlet } from 'react-router-dom';
import { lazyImport } from './utils/lazyImport';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';
import Home from './app/home';
import WatchHistory from './components/common/watchHistory';
const Settings = lazyImport(() => import('./components/setting/settings'));
const ManageProfile = lazyImport(() => import('./components/setting/profileSettings/index'));
const SecuritySettings = lazyImport(() => import('./components/setting/securitySettings'));
const NotificationSettings = lazyImport(() => import('./components/setting/notifications/notificationSettings'));
const Streaming = lazyImport(() => import('./app/videoPlay/streaming'));
const AuthIndex = lazyImport(() => import('./app/auth/index'));
const ProfileIndex = lazyImport(() => import('./app/profile/index'));
const OwnerProfile = lazyImport(() => import('./app/videoPlay/ownerProfile'));
import HomeProfile from './components/common/homeProfile';
const LiveStreaming = lazyImport(() => import('./components/common/liveStreaming'));
import VideosTab from './components/common/videoTab';
const UploadVideo = lazyImport(() => import('./components/common/uploadVideo'));
import NotificationPage from './app/notifications/notificationPage';
const Chat = lazyImport(() => import('./app/chat/index'));
import { useEffect, Suspense } from 'react';
import { messaging } from './firebase';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';
import SearchResult from './app/search/index';
import { useDispatch, useSelector } from 'react-redux';
import { setPermission, registerFcmToken, removeFcmToken } from './features/slice/notificationFcm.slice';
import Loader from './components/common/loader';
import PrivateRoute from './utils/privateRoute';
import PublicRoute from './utils/publicRoute';

function App() {
  const [sidebarData, setSidebarData] = useState(false);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.User);
  const isLoggedIn = !!info; // true if user is logged in

  console.log('User info in App.jsx:', isLoggedIn);

  const { token } = useSelector((state) => state.notifications);



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


  useEffect(() => {
    navigator.permissions.query({ name: "notifications" }).then((permissionStatus) => {
      dispatch(setPermission(permissionStatus.state));

      permissionStatus.onchange = () => {
        const newPermission = permissionStatus.state;
        console.log('Notification permission changed to:', newPermission);
        dispatch(setPermission(newPermission));

        if (isLoggedIn) {
          if (newPermission === "granted" && !token) {
            console.log('Permission granted, registering token in app.jsx');
            dispatch(registerFcmToken());
          } else if (newPermission === "denied" && token) {
            console.log('Permission denied, removing token in app.jsx');
            dispatch(removeFcmToken(token));
          }
        }
      };
    });
  }, [dispatch, isLoggedIn, token]);




  const handleSideBar = () => {
    setSidebarData(!sidebarData);
  }


  return (

    <div>

      <Header handleSideBar={handleSideBar} />
      <Sidebar sidebarData={sidebarData} />


      <div

        className={`mt-[4%] transition-all duration-300  ${sidebarData ? 'ml-[11.5rem]' : 'ml-[4.5rem]'
          }`}
      >
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchHistory" element={<WatchHistory />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/settings" element={< Settings />} />
            <Route path="/manageProfile" element={<ManageProfile />} />
            <Route path="/manageSecurity" element={<SecuritySettings />} />
            <Route path="/manageNotifications" element={<NotificationSettings />} />
            <Route path="/videoPlay/streaming/:id" element={<Streaming />} />
            <Route path="/auth/index" element={<PublicRoute><AuthIndex /></PublicRoute>}/>
            <Route path="/search" element={<SearchResult />} />
            <Route path="/profile/index" element={<PrivateRoute><ProfileIndex/></PrivateRoute>} >
              <Route index element={<HomeProfile />} />
              <Route path="live" element={<LiveStreaming />} />
              <Route path="home" element={<HomeProfile />} />
              <Route path="getVideo" element={<VideosTab />} />
              <Route path="watchHistory" element={<WatchHistory />} />
              <Route path="uploadVideo" element={< UploadVideo />} />
            </Route>
            <Route path="/videoPlay/ownerProfile/:username" element={<OwnerProfile />} >
              <Route index element={<HomeProfile />} />
              <Route path="live" element={<LiveStreaming />} />
              <Route path="home" element={<HomeProfile />} />
              <Route path="getVideo" element={<VideosTab />} />
            </Route>
            <Route path="/chat" element={ <PrivateRoute><Chat /></PrivateRoute>} />
          </Routes>
        </Suspense>

      </div>

    </div>



  )
}

export default App

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

function App() {
  const [sidebarData, setSidebarData] = useState(false);

  console.log('url from render ',process.env.VITE_API_URL);

  const handleSideBar=()=>{
    setSidebarData(!sidebarData);
  }
 

  return (

      <div>
  <Header handleSideBar={handleSideBar} />
  <Sidebar sidebarData={sidebarData} />

  {/* Content wrapper that adjusts margin-left based on sidebar */}
  <div
    className={`mt-[5%] transition-all duration-300  ${
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
    </Routes>
  </div>
</div>

      
    
  )
}

export default App

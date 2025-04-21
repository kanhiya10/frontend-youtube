import { useState } from 'react'
import './App.css'
import { Route,Routes,Outlet } from 'react-router-dom';
// import UserProfile from './profile/user.profile'
// import UserInfo from './profile/profileComponents/userInfo';
// import SearchInfo from './profile/profileComponents/searchInfo';
// import Video from './profile/profileComponents/video';
// import GetVideo from './profile/profileComponents/getVideo';
// import WatchHistory from './profile/profileComponents/watchHistory';
// import Home from './app/home';
// import Header from './components/header';
// import RegisterProfile from './profile/register';
// import Sidebar from './components/sidebar';
// import DisplayInfo from './profile/profileComponents/displayInfo';
// import Content from './profile/profileComponents/content';
// import Live from './profile/profileComponents/live';
// import PlayVideo from './profile/profileComponents/playVideo';
import Home from './app/home';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';
import Search from './components/common/serach';
import Streaming from './app/videoPlay/streaming';
import AuthIndex from './app/auth/index';
// import DisplayInfo from './app/profile/index';
import OwnerProfile from './app/videoPlay/ownerProfile';
import ProfileIndex from './app/profile/index';
import LiveStreaming from './app/profile/liveStreaming';
// import axios from "axios"

function App() {
  const [sidebarData, setSidebarData] = useState(false);

  const handleSideBar=()=>{
    setSidebarData(!sidebarData);
  }
 

  return (
    
      // <div>
      
      // <Header handleSideBar={handleSideBar}/>
      // <Sidebar sidebarData={sidebarData}/>
      // <Routes>
      //   <Route path="/" element={<Home/>} />
      //   <Route path="/user.profile" element={<UserProfile/>}/>
      //    <Route path="/DisplayInfo" element={<DisplayInfo />}> 
      //    <Route index path="content" element={<Content />} />
      //    <Route path="video" element={<Video />} />
      //   <Route path="getVideo" element={<GetVideo />} >
        
      //   </Route>
      //   <Route path="watchHistory" element={<WatchHistory />} />
      //   <Route path="live" element={<Live />} />
      //   </Route>
      //   <Route path="/DisplayInfo/getVideo/playVideo" element={<PlayVideo />} />
      // </Routes>
      // </div>

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
      <Route path="/videoPlay/streaming" element={<Streaming />} />
      <Route path="/auth/index" element={<AuthIndex />} />
      <Route path="/profile/index" element={<ProfileIndex />} >
      <Route path="live" element={<LiveStreaming/>} />
      </Route>
      <Route path="/videoPlay/ownerProfile/:username" element={<OwnerProfile/>} />
    </Routes>
  </div>
</div>

      
    
  )
}

export default App

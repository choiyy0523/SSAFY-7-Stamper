import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from './components/header/header';
import Login from './components/login/login'
import Signup from './components/signup/signup'
import MainPage from './components/mainPage/mainPage'
import UserProfile from './components/userProfile/userProfile'
import UserProfileModify from './components/userProfileModify/userProfileModify'
import Landmark from './components/landmark/landmark'
import LandmarkRegister from './components/landmarkRegister/landmarkRegister'
import CollectionTheme from './components/collectionTheme/collectionTheme'
import CollectionThemeDetail from './components/collectionTheme/collectionThemeDetail'
import CollectionSeoul from './components/collectionSeoul/collectionSeoul'
import CollectionSeoulDetail from './components/collectionSeoul/collectionSeoulDetail'
import LandingPage from './components/landingPage/landingPage'
import ImageTest from './components/imageTest/imageTest';
import './App.css';

function App() {

  const loginCheck = () => {
    return 1
    // window.sessionStorage.getItem("loginCheck") === "true";
  };
  
  const [memberData, setMemberData] = useState(
    window.sessionStorage.getItem("memberData")
  );

  useEffect(() => {
    setMemberData(window.sessionStorage.getItem("memberData"));
  }, [window.sessionStorage.getItem("memberData")]);

  return (
    <div className="App">
      <div>
        {/* <Header></Header> */}
      </div>
      <Router>
        <Routes>
          <Route path="/test" element={<ImageTest/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/profile/:userNo" element={<UserProfile/>}></Route>
          <Route path="/profile/:userNo/modify" element={<UserProfileModify/>}></Route>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/landmark/:landmarkNo" element={<Landmark/>}></Route>
          <Route path="/landmark/register" element={<LandmarkRegister/>}></Route>
          <Route path="/collection/seoul/index" element={<CollectionSeoul/>}></Route>
          <Route path="/collection/theme/index" element={<CollectionTheme/>}></Route>
          <Route path="/collection/seoul/:districtNo" element={<CollectionSeoulDetail/>}></Route>
          <Route path="/collection/seoul/:themeNo" element={<CollectionThemeDetail/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;

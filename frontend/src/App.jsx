import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from './components/header/index';
import Login from './components/login/index'
import Signup from './components/signup/index'
import MainPage from './components/mainPage/index'
import UserProfile from './components/userProfile/index'
import UserProfileModify from './components/userProfileModify/index'
import Landmark from './components/landmark/index'
import LandmarkRegister from './components/landmarkRegister/index'
import CollectionTheme from './components/collectionTheme/index'
import CollectionThemeDetail from './components/collectionTheme/collectionThemeDetail'
import CollectionSeoul from './components/collectionSeoul/index'
import CollectionSeoulDetail from './components/collectionSeoul/collectionSeoulDetail'
import LandingPage from './components/landingPage/index'
import ImageTest from './components/imageTest';
import './App.css';

function App() {

  const loginCheck = () => {
    return window.sessionStorage.getItem("loginCheck") === "true";
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
        <Header></Header>
      </div>
      <Router>
        <Routes>
          <Route path="/test" element={<ImageTest/>}></Route>
          <Route path="/login" element={loginCheck()? <Navigate to='/'/> : <Login/>}></Route>
          <Route path="/signup" element={loginCheck()? <Navigate to='/'/> : <Signup/>}></Route>
          <Route path="/profile/:userNo" element={<UserProfile/>}></Route>
          <Route path="/profile/:userNo/modify" element={<UserProfileModify/>}></Route>
          <Route path="/" element={loginCheck() ? <MainPage/> : <LandingPage/>}></Route>
          <Route path="/landmark/:landmarkNo" element={loginCheck()? <Landmark/> : <Navigate to='/login'/>}></Route>
          <Route path="/landmark/register" element={loginCheck()? <LandmarkRegister/> : <Navigate to='/login'/>}></Route>
          <Route path="/collection/seoul/index" element={loginCheck()? <CollectionSeoul/> : <Navigate to='/login'/>}></Route>
          <Route path="/collection/theme/index" element={loginCheck()? <CollectionTheme/> : <Navigate to='/login'/>}></Route>
          <Route path="/collection/seoul/:districtNo" element={loginCheck()? <CollectionSeoulDetail/> : <Navigate to='/login'/>}></Route>
          <Route path="/collection/seoul/:themeNo" element={loginCheck()? <CollectionThemeDetail/> : <Navigate to='/login'/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

import './header.css'
import { Grid } from '@mui/material'
import Logo from '../../assets/LOGO.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { SET_LOGOUT } from '../../redux/UserInfo'


export default function header() {
    const dispatch = useDispatch();
    // const navigate = useNavigate()
    const onClickHandler = () => {
        dispatch(SET_LOGOUT());
        const updateUserInfo = {
          userName: null,
          userNickname: null,
          userPhone: null,
          userEmail: null,
        };
        dispatch(SET_USERINFO(updateUserInfo));
        dispatch(SET_TOKEN(null));
      };
    


    const loggedIn = useSelector((state) => state.UserInfo.loggedIn);

    return (
    <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" />
            <span id='burgerOne'></span>
            <span id='burgerTwo'></span>
            <span id='burgerThree'></span>
            <ul id="menu">                
                <li><a className='menuItem' href="/">Home</a></li> 
                { loggedIn ? 
                <li><a className='menuItem' onClick={onClickHandler}>로그아웃</a></li> :
                <li><a className='menuItem' href="/">로그인</a></li>}
               
                { loggedIn ?
                <li><a className='menuItem' href="/profile/">마이페이지</a></li>: <></>}

                { loggedIn ?
                <li><a className='menuItem' href="/collection/theme/index">테마별수집현황</a></li> : <></> }

                { loggedIn ?
                <li><a className='menuItem' href="/collection/seoul/index">구별수집현황</a></li> : <></> }    
                <hr></hr>
                
            </ul>
        </div>
        <a href='/'>
            <img className='navLogo' src={Logo}></img>
        </a>
        <a href='/'>
            <div className='navTitle'>스탬퍼</div>
        </a>
    </nav>
    )
}
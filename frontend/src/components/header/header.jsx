import './header.css'
import { Grid } from '@mui/material'
import Logo from '../../assets/LOGO.png'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


export default function header(props) {
    const onClickHandler = () => {
        axios.get(`/api/users/logout`).then((response) => {
            if (response.data.success) {
                Navigate("/login");
            } else {
                alert("로그아웃에 실패했습니다");
            }
        })
    }

    return (
    <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" />
            <span id='burgerOne'></span>
            <span id='burgerTwo'></span>
            <span id='burgerThree'></span>
            <ul id="menu">
                <li><a className='menuItem' href="/">Home</a></li>
                <li><a className='menuItem' href="/loginpage">Login</a></li>
                <li><a className='menuItem' href="/profile/0">마이페이지</a></li>
                <li><a className='menuItem' href="/collection/theme/index">테마별수집현황</a></li>
                <li><a className='menuItem' href="/collection/seoul/index">구별수집현황</a></li>
                <hr></hr>
                <li><a className='logout' onClick={onClickHandler}>로그아웃</a></li>
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
import './header.css'
import Menu from '../../assets/burgermenu.png'
import { Grid } from '@mui/material'
import Logo from '../../assets/LOGO.png'


export default function header() {
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
                <li><a className='menuItem' href="/landmark/register">랜드마크등록</a></li>
                <li><a className='menuItem' href="/collection/theme/index">테마별수집현황</a></li>
                <li><a className='menuItem' href="/collection/seoul/index">구별수집현황</a></li>
                <li><a className='menuItem' href="/test">이미지테스트</a></li>
                <li><a className='menuItem' href="/signup">회원가입</a></li>
            </ul>
        </div>
        <img href='/' className='navLogo' src={Logo}></img>
        <div className='navTitle'>스탬퍼</div>
    </nav>
    )
}
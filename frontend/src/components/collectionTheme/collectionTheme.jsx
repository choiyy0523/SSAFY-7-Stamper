import "./collectionTheme.css"
import * as React from 'react';
import { useState } from "react";

const collectionTheme = () => {
    const [gongwon, setGongwon] = useState('공원')
    const [uheung, setUheung] = useState('여흥')
    const [myeongso, setMyeongso] = useState('명소')
    const [munwhasiseol, setMunhwasiseol] = useState('문화시설')
    const [shopping, setShopping] = useState('쇼핑')
    const [jonggyo, setJonggyo] = useState('종교')
    const [bridge, setBridge] = useState('다리')
    const [jeonsigwan, setJeonsigwan] = useState('전시관')
    const [munhwajae, setMunhwajae] = useState('문화재')
    const [jiyeoksangjing, setJiyeoksangjing] = useState('지역상징성')
    const [gucheong, setGucheong] = useState('구청')
    const [guitar, setGuitar] = useState('기타')
    return (
        <div>    
            <h2>(nickname)의 테마별 수집 현황</h2>
                <div id = "wrap" className="grid-image">
                    <section><img className="theme_icon" src="/src/assets/theme/gongwon.png" alt="" /><br />{ gongwon } ( 3 / 7 )</section>
                    <section><img className="theme_icon" src="/src/assets/theme/uheung.png" alt="" /><br />{ uheung }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/myeongso.png" alt="" /><br />{ myeongso }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/munhwasiseol.png" alt="" /><br />{ munwhasiseol }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/shopping.png" alt="" /><br />{ shopping }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/jonggyo.png" alt="" /><br />{ jonggyo }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/bridge.png" alt="" /><br />{ bridge }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/jeonsigwan.png" alt="" /><br />{ jeonsigwan }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/munhwajae.png" alt="" /><br />{ munhwajae }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/jiyeoksangjing.png" alt="" /><br />{ jiyeoksangjing }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/gucheong.png" alt="" /><br />{ gucheong }</section>
                    <section><img className="theme_icon" src="/src/assets/theme/guitar.png" alt="" /><br />{ guitar }</section>
                </div>
        </div>
    );
  };

export default collectionTheme;
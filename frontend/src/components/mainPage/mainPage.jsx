import "./mainPage.css"
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment, useState, useRef, useEffect } from 'react';

const mainpage = () => {

    const userInfo = useSelector((state) => state.UserInfo);
    const userName = userInfo.userInfo.userName;
    const userNick = userInfo.userInfo.userNickname;
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;

    return (
        <div>
            <br />
            <div className="between widthcenter" >
                <div className="colorblock outer-div">
                <a href="/collection/seoul/index" className="bigfont inner-div">구별</a>
                </div>
                <div className="colorblock outer-div">
                <a href="/collection/theme/index" className="bigfont inner-div">테마별</a>
                </div>
            </div>

            <br />

            {/* <div className=" widthcenter colorblock2">
            <a href="/landmark/register" className="bigfont inner-div">랜드마크등록</a>
            </div> */}


        </div> 
    );
  };

export default mainpage;
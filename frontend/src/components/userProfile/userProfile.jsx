import "./userProfile.css"
import * as React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AchievedList from "./achievedList";
import CollectedList from "./collectedList";

const userprofile = () => {
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.UserInfo);
    const userNickname = userInfo.userInfo.userNickname;
    const userName = userInfo.userInfo.userName;
    const userPhone = userInfo.userInfo.userPhone;
    const userEmail = userInfo.userInfo.userEmail;
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;
  

    return (
        <div className="aligncenter">
            {/* 프로필 카드 */}
            <div className="container profile_background">
                {/* 프로필 사진과 이름 */}
                <div className="item">
                    <img className="temp_dummy_profile_photo" src="/assets/components/user.png" alt="" />
                    <p> {userNickname} </p>
                </div>
                
                {/* 자기소개 */}
                <div className="item">
                    <p>이름 : {userName} </p>
                    <p>닉네임 : {userNickname} </p>
                    <p>폰번호 : {userPhone} </p>
                    <p>이메일 : {userEmail} </p>
                    {/* <p>나이: 29  성별: 남  취미: 클라이밍</p>
                    <p>성북구 랜드마크 뿌셔!</p> */}
                </div>

                <a className="item" href="/profile/modify">
                    <img className="profile_control_comp" src="/assets/components/account.png" alt="" />
                </a>

            </div>
            <br />
                <br />
                
                <hr className="customhr" />
                    
                {/* 프로필의 기념도장과 랜드마크 아이콘 */}
            <div className="item">
                <br />
                
                <div>
                    <h1 > 나의 업적 </h1>
                    <AchievedList></AchievedList>
                    {/* <img className="profile_comp" src="/assets/components/stamp.png" alt="" /> */}
                </div>
                <br />
                <br />
                <br />
                
                <hr className="customhr" />
                <br />
                <br />



                <div>
                    <h1 > 나의 랜드마크 </h1>
                    <br />
                    <CollectedList></CollectedList>
                </div>
            </div> 
        </div>
    );
  };

export default userprofile;
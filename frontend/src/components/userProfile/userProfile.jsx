import "./userProfile.css"
import * as React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAchieveList } from "../../api/achieve";


const userprofile = () => {
    const dispatch = useDispatch();

    const [achieveList, setAchieveList] = useState([]);

    const userInfo = useSelector((state) => state.UserInfo);
    const userNickname = userInfo.userInfo.userNickname;
    const userName = userInfo.userInfo.userName;
    const userPhone = userInfo.userInfo.userPhone;
    const userEmail = userInfo.userInfo.userEmail;
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;
  
    useEffect(() => {
        getAchieveList(userSeq, token, (response)=>{
            console.log(response.data.achieveList);
            setAchieveList(response.data.achieveList);
        }, (error)=>{
            console.log(error);
        })

    },[])
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

                <a className="item" href="#">
                    <img className="profile_control_comp" src="/assets/components/myintro.png" alt="" />
                </a>

                <a className="item" href="/profile/modify">
                    <img className="profile_control_comp" src="/assets/components/account.png" alt="" />
                </a>

            </div>
                    
                {/* 프로필의 기념도장과 랜드마크 아이콘 */}
            <div className="item">
                <br />
                
                <div>
                    <h1> 나의 업적 </h1>
                </div>
                
                {/* 로고 나열 */}
                <div>
                  <img className="profile_comp" src="/assets/components/stamp.png" alt="" />
                    {achieveList.map((data) =>{
                        return(
                        <div>
                            <div>
                                업적이름 : {data.achieve.achieveName}
                            </div>
                            <div>{data.userAchievementTime} </div>
                        </div>
                        )

                    })}
                </div>
            </div> 
        </div>
    );
  };

export default userprofile;
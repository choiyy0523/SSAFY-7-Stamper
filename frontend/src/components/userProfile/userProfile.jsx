import "./userProfile.css"
import * as React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AchievedList from "./achievedList";
import { getAllBookDetail } from "../../api/book";
import { getAchieveList } from "../../api/achieve";
import CollectedList from "./collectedList";

const userprofile = () => {
    const dispatch = useDispatch();

    const [achieveList, setAchieveList] = useState([]);
    const [collectedList, setCollectedList] = useState([]);

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

    useEffect(()=>{
        getAllBookDetail(userSeq, token, (response) => {
            setCollectedList(response.data.collectedBookList)
        })
    }, [])

    return (
        <div className="aligncenter">
            {/* 프로필 카드 */}
            <div className="container profile_background">
                {/* 프로필 사진과 이름 */}
                <div>
                    <img style={{ width:'30vw', marginTop:'10px'}} src="/assets/components/user.png" alt="" />
                    <p style={{fontSize:'20px', marginBottom:'0px', marginTop:'10px'}}> {userNickname} </p>
                </div>
                
                {/* 자기소개 */}
                <div style={{position:'absolute', marginTop:'5px', textAlign:'start', left:'150px'}}>
                    <p style={{marginTop:'25px', marginBottom:'4px'}}>이름 : {userName} </p>
                    <p style={{marginTop:0, marginBottom:'4px'}}>닉네임 : {userNickname} </p>
                    <p style={{marginTop:0, marginBottom:'4px'}}>폰번호 : {userPhone} </p>
                    <p style={{marginTop:0, marginBottom:'4px'}}>이메일 : {userEmail} </p>
                    <p style={{marginTop:0, marginBottom:'4px'}}>등록한 랜드마크:{collectedList.length}</p>
                    <p style={{marginTop:0, marginBottom:'4px'}}>달성한 업적: {achieveList.length}</p>
                </div>


                <a href="/profile/modify">
                    <img style={{position:'absolute', width:'8vw', height:'8vw',top:'6px', right:'18px'}} src="/assets/components/myintro.png" alt="" />
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
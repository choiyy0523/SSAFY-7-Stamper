import "./userProfile.css"
import * as React from 'react';

const userprofile = () => {
    return (
        <div>
            {/* 프로필 카드 */}
            <div className="container profile_background">
                {/* 프로필 사진과 이름 */}
                <div className="item">
                    
                        <img className="temp_dummy_profile_photo" src="/src/assets/components/temp_user.png" alt="" />
                    
                    <p>(닉네임)</p>
                </div>
                    
                {/* 프로필의 기념도장과 랜드마크 아이콘 */}
                <div className="item">
                    <img className="profile_comp" src="/src/assets/components/stamp.png" alt="" />
                        <p>10</p>
                        <p>기념도장(프로필 카드 안)</p>
                    <img className="profile_comp" src="/src/assets/components/ferris.png" alt="" />
                        <p>52</p>
                        <p>랜드마크(프로필 카드 안)</p>
                </div>

                {/* 자기소개 */}
                <div className="item">
                    <p>나이: 29  성별: 남  취미: 클라이밍</p>
                    <p>성북구 랜드마크 뿌셔!</p>
                </div>

                <a className="item" href="#">
                    <img className="profile_control_comp" src="/src/assets/components/myintro.png" alt="" />
                </a>

                <a className="item" href="/profile/:userNo/modify">
                    <img className="profile_control_comp" src="/src/assets/components/account.png" alt="" />
                </a>
            </div>
            {/* ~~~ */}
            {/* 프로필 카드 끝 */}


            
<br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br />
            {/* 기념 도장 목록 (프로필 카드 밖) */}
            <div>
            <h1>(레이아웃 조정 필요)</h1>
                <h2>기념도장</h2>
                <img className="profile_control_comp" src="/src/assets/components/stamp_tooltip.png" alt="" />
                <li>유저별 모은 기념도장(업적)</li>
            </div>
        

            {/* 등록된 랜드마크 목록 (프로필 카드 밖) */}
            <div>
                <h2>랜드마크</h2>
                <img className="profile_control_comp" src="/src/assets/components/list.png" alt="" />
                <img className="profile_control_comp" src="/src/assets/components/register.png" alt="" />
                <li>유저별 랜드마크 사진 연동</li>
            </div>
        </div> 
    );
  };

export default userprofile;
import "./userProfile.css"
import * as React from 'react';

const userprofile = () => {
    return (
        <div>
            {/* 프로필 카드 */}
            <div>
                {/* 프로필 사진과 이름 */}
                <div>
                    <section className="profile_photo">
                        <img className="temp_dummy_profile_photo" src="https://via.placeholder.com/150" alt="" />
                    </section>
                    <p>석호필</p>
                </div>
                    
                {/* 프로필의 기념도장과 랜드마크 아이콘 */}
                <div>
                    <img className="profile_comp" src="/src/assets/components/stamp.png" alt="" />
                        <p>10</p>
                        <p>기념도장(프로필 카드 안)</p>
                    <img className="profile_comp" src="/src/assets/components/ferris.png" alt="" />
                        <p>52</p>
                        <p>랜드마크(프로필 카드 안)</p>
                </div>

                {/* 자기소개 */}
                <div>
                    <p>나이: 29  성별: 남  취미: 클라이밍</p>
                    <p>성북구 랜드마크 뿌셔!</p>
                </div>

                <a href="/profile/:userNo/modify">
                    <img className="profile_control_comp" src="/src/assets/components/write.png" alt="" />
                </a>
            </div>
            {/* 프로필 카드 끝 */}


            {/* 기념 도장 목록 (프로필 카드 밖) */}
            <div>
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
import "./userProfileModify.css"
import * as React from 'react';

const userprofilemodify = () => {
    return (
        <div>
            <h1>(nickname)님 환영합니다!</h1>
            

            <div>
                {/* 프로필 카드 */}
                <div>
                    <section className="profile_photo"><img className="temp_dummy_profile_photo" src="https://via.placeholder.com/150" alt="" /></section>
                </div>
                <p>성북구 랜드마크 뿌셔!</p>
                

            </div>

            

            <a href="/profile/:userNo/modify">
                <img className="modify_comp" src="/src/assets/components/write.png" alt="" />
            </a>
        </div> 
    );
  };

export default userprofilemodify;
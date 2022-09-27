import "./userProfile.css"
import * as React from 'react';

const userprofile = () => {
    return (
        <div>
            <h1>마이페이지</h1>
            <br />
            <br />
            <a href="/profile/:userNo/modify">마이페이지 수정</a>
        </div> 
    );
  };

export default userprofile;
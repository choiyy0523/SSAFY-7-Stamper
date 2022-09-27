import "./mainPage.css"
import * as React from 'react';

const mainpage = () => {
    return (
        <div>
            <h1>도감 보기</h1>
            <br />
            <div className="between">
                <a href="/collection/seoul/index">구별</a>
                <a href="/collection/theme/index">테마별</a>
            </div>

            <br />

            <a href="/landmark/register">랜드마크등록</a>
        </div> 
    );
  };

export default mainpage;
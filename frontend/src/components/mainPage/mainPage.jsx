import "./mainPage.css"
import * as React from 'react';

const mainpage = () => {
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

            <div className=" widthcenter colorblock2">
            <a href="/landmark/register" className="bigfont inner-div">랜드마크등록</a>
            </div>


        </div> 
    );
  };

export default mainpage;
import "./userProfileModify.css"
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

const userprofileModify = () => {
    return (
        <div>
            {/* 프로필 사진과 이름 */}
            <div className="item">
                <img className="temp_dummy_profile_photo" src="/src/assets/components/temp_user.png" alt="" />
                <p className="muruk">Stamper</p>
                <p>(닉네임)</p>
            </div>

            <div className="profile_background2">
                <div>
                    <br />
                    <TextField className="input_comp"
                    disabled
                    id="fixName"
                    label="이름"
                    /> <br /><br /><br />

                    <TextField className="input_comp"
                    required
                    id="password"
                    label="현재 비밀번호"
                    /> <br /><br />

                    <TextField className="input_comp"
                    required
                    id="newPassword"
                    label="새 비밀번호"
                    type="password"
                    /> <br /><br />

                    <TextField className="input_comp"
                    required
                    id="newPasswordRe"
                    label="새 비밀번호 확인"
                    type="password"
                    /> <br /><br /><br />

                    <TextField className="input_comp"
                    id="nickname"
                    label="닉네임"
                    />
                </div><br /><br />
                <button>저장!</button>
            </div>
        
            <div className="nav_position"><div> 
                <a className="item" href="/profile/:userNo">
                    <img className="nav_undo" src="/src/assets/components/undo.png" alt="" />
                </a></div>
            </div>
        </div> 
    );
  };

export default userprofileModify;
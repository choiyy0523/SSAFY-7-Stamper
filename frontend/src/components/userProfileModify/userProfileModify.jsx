import "./userProfileModify.css"
import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSelector } from "react-redux";

import UserInfo, {
  SET_USERINFO,
  SET_LOGOUT,
  SET_TOKEN,
} from "../../redux/UserInfo";

import { useDispatch } from "react-redux";
import { updateUser, updateUserPassword } from "../../api/user";

function userprofileModify ( { open, setOpen }) {

    const token = useSelector((state) => state.UserInfo.accessToken);
    const userInfo = useSelector((state) => state.UserInfo.userInfo);
    const userName = userInfo.userName;
    const userNick = userInfo.userNick;
    const userPhone = userInfo.userPhone;
    const userEmail = userInfo.userEmail;
  
    const [newUserName, setNewUserName] = React.useState(userName);
    const [newUserNick, setNewUserNick] = React.useState(userNick);
    const [newUserPhone, setNewUserPhone] = React.useState(userPhone);
    const [newUserEmail, setNewUserEmail] = React.useState(userEmail);
  
    const [currentPassword, setCurrentPassword] = React.useState();
    const [newPassword, setNewPassword] = React.useState();
  
    const [openChangePassword, setOpenChangePassword] = React.useState(false);

    const onNewUserName = (event) => {
      setNewUserName(event.target.value);
    };
    const onNewUserNick = (event) => {
      setNewUserNick(event.target.value);
    };
    const onNewUserPhone = (event) => {
      setNewUserPhone(event.target.value);
    };
    const onNewUserEmail = (event) => {
        setNewUserEmail(event.target.value);
    };

    const onCurrentPassword = (event) => {
      setCurrentPassword(event.target.value);
    };

    const onNewPassword = (event) => {
      setNewPassword(event.target.value);
    };

    const handleOpenChangePassword = () => {
      setOpenChangePassword(true);
    };
    const handleCloseChangePassword = () => {
      setOpenChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
    };
  
    const dispatch = useDispatch();
  
    const [onOff, setOnOff] = React.useState(false);
  
    const updateTry = () => {
      setOnOff((current) => !current);
      console.log("수정버튼 클릭");
      console.log(userInfo);
    };
  
    const onSubmit = () => {
      const updateUserInfo = {
        userName: newUserName,
        userNickname: newUserNick,
        userPhone: newUserPhone,
        userEmail : newUserEmail,
      };

      const success = (res) => {
        
        console.log("수정 완료", res.data.userRes);
        dispatch(SET_USERINFO(res.data.userRes));
        alert("수정 완료 되었습니다.")
      };
  
      const error = (res) => {
        console.log("수정 실패", res);
        alert("수정에 실패했습니다.")
  
      };
      updateUser(updateUserInfo, token, success, error);
      console.log(updateUserInfo)
    };
  
    const onSubmitPassword = () => {
      console.log(token);
      const updateUserPasswordInfo = {
        currentPassword,
        newPassword,
      };
      console.log(updateUserPasswordInfo);
      const success = (res) => {
        console.log("비밀번호 변경 성공", res);
        alert("비밀번호가 변경되었습니다.");
        handleClose();
        handleCloseChangePassword();
      };
      <Link to="/"></Link>;
      const error = (res) => {
        console.log("비밀번호 변경 실패", res);
        console.log(res.response.data.message)
        alert("비밀번호 변경에 실패했습니다.");
      };
      updateUserPassword(updateUserPasswordInfo, token, success, error);
    };

    return (
        <div>
            <h1> 프로필 수정 </h1>
            {/* 프로필 사진과 이름 */}
            <div>
                <img className="temp_dummy_profile_photo" src="/assets/components/user.png" alt="" />
                <p className="userName">{ userName }</p>
            </div>

            <div className="profile_background2 colorblock4" >
                <div>
                    <br />
                    <TextField className="input_comp"
                    disabled
                    id="fixName"
                    label="이름"
                    defaultValue={userName} 
                    /> <p className="seolmyeong"> 이름은 수정할 수 없습니다.</p>

                    <TextField className="input_comp"
                    required
                    id="userNick"
                    color="secondary"
                    label="닉네임"
                    defaultValue={userNick}
                    value={newUserNick}
                    onChange={onNewUserNick}
                    />
                     <br /><br />

                    <TextField className="input_comp"
                    required
                    id="userPhone"
                    color="secondary"
                    label="전화번호"
                    defaultValue={userPhone}
                    value={newUserPhone}
                    onChange={onNewUserPhone}
                    /> <br /><br /><br />

                    <TextField className="input_comp"
                    required
                    id="userEmail"
                    color="secondary"
                    label="이메일"
                    defaultValue={userEmail}
                    value={newUserEmail}
                    onChange={onNewUserEmail}
                    /> <br /><br /><br />

                    <div>
                        <Button color="secondary">비밀번호 변경</Button>
                        <Button onClick={onSubmit} color="secondary">기본 정보 변경</Button>
                    </div>

                    {/* <Dialog
                    open={openChangePassword}
                    keepMounted
                    onClose={handleCloseChangePassword}
                    >


                    </Dialog>

                    <TextField className="input_comp"
                    required
                    color="secondary"
                    label="현재 비밀번호"
                    value={currentPassword}
                    id="currentPassword"
                    onChange={onCurrentPassword}
                    /> <br /><br />
                    
                    <TextField className="input_comp"
                    required
                    id="newPassword"
                    color="secondary"
                    label="새 비밀번호"
                    type="password"
                    value={newPassword}
                    onChange={onNewPassword}
                    /> <br /><br /> */}


            </div>
        
            <div className="nav_position"><div> 
                <a className="item" href="/profile/:userNo">
                    <img className="nav_undo" src="/assets/components/undo.png" alt="" />
                </a></div>
            </div>
        </div> 
    </div>
    );
  };

export default userprofileModify;
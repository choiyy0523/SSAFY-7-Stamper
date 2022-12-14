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
    const userNick = userInfo.userNickname;
    const userPhone = userInfo.userPhone;
    const userEmail = userInfo.userEmail;
  
    const [newUserName, setNewUserName] = React.useState(userName);
    const [newUserNick, setNewUserNick] = React.useState(userNick);
    const [newUserPhone, setNewUserPhone] = React.useState(userPhone);
    const [newUserEmail, setNewUserEmail] = React.useState(userEmail);
  
    const [isUserNick, setIsUserNick] = useState(false);
    const [userNickMessage, setUserNickMessage] = useState("");

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
      console.log("???????????? ??????");
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
        
        console.log("?????? ??????", res.data.userRes);
        dispatch(SET_USERINFO(res.data.userRes));
        alert("?????? ?????? ???????????????.")
      };
  
      const error = (res) => {
        console.log("?????? ??????", res);
        alert("????????? ??????????????????.")
  
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
        console.log("???????????? ?????? ??????", res);
        alert("??????????????? ?????????????????????.");
        handleClose();
        handleCloseChangePassword();
      };

      const error = (res) => {
        console.log("???????????? ?????? ??????", res);
        console.log(res.response.data.message)
        alert("???????????? ????????? ??????????????????.");
      };
      updateUserPassword(updateUserPasswordInfo, token, success, error);
    };

    return (
        <div>
            <h1> ????????? ?????? </h1>
            {/* ????????? ????????? ?????? */}
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
                    label="??????"
                    defaultValue={userName} 
                    /> <p className="seolmyeong"> ????????? ????????? ??? ????????????.</p>

                    <div
                        class={`txt_field ${
                            isUserNick ? "txt_field" : "txt_field_false"
                        } ${userNickMessage ? "txt_field_message" : ""}`}>

                    <TextField className="input_comp"
                    required
                    id="userNick"
                    color="secondary"
                    label="?????????"
                    defaultValue={userNick}
                    value={newUserNick}
                    onChange={(e) => {

                        setNewUserNick(e.target.value);
                        if (e.target.value.length > 12) {
                          setIsUserNick(false);
                          setUserNickMessage("12??? ????????? ???????????? ???????????????");
                          return;
                        } else {
                          setIsUserNick(true);
                          setUserNickMessage("");
                        }
                    }}
                    /><span>{userNickMessage}</span>
                     <br /><br />

                    </div>

                    <TextField className="input_comp"
                    id="userPhone"
                    color="secondary"
                    label="????????????"
                    defaultValue={userPhone}
                    value={newUserPhone}
                    onChange={onNewUserPhone}
                    /> <br /><br /><br />

                    <TextField className="input_comp"
                    id="userEmail"
                    color="secondary"
                    label="?????????"
                    defaultValue={userEmail}
                    value={newUserEmail}
                    onChange={onNewUserEmail}
                    /> <br /><br /><br />

                    <div>
                        <Button onClick={handleOpenChangePassword} color="secondary">???????????? ??????</Button>
                        <Button
                        onClick={onSubmit}
                        color="secondary"
                        disabled={
                            !(newUserNick)
                        }>?????? ?????? ??????</Button>
                    </div>

                    <Dialog
                    open={openChangePassword}
                    keepMounted
                    onClose={handleCloseChangePassword}
                    >
                    
                    <DialogTitle>
                        {"???????????? ??????"}
                    </DialogTitle>
                    
                    <DialogContent>
                        <TextField className="input_comp"
                        required
                        color="secondary"
                        label="?????? ????????????"
                        type="password"
                        value={currentPassword}
                        id="currentPassword"
                        onChange={onCurrentPassword}
                        /> <br /><br />
                        
                        <TextField className="input_comp"
                        required
                        id="newPassword"
                        color="secondary"
                        label="??? ????????????"
                        type="password"
                        value={newPassword}
                        onChange={onNewPassword}
                        /> <br /><br />
                    </DialogContent>

                    <DialogActions className="option-cell">
                        <div className="cancel-button">
                            <Button onClick={handleCloseChangePassword}>
                            <div className="cancel-button-text">??????</div>
                            </Button>
                        </div>
                        <div className="accept-button">
                            <Button onClick={onSubmitPassword}>
                            <div className="accept-button-text">??????</div>
                            </Button>
                        </div>
                    </DialogActions>

                    </Dialog>

            </div>
        
            <div className="nav_position"><div> 
                <a className="item" href="/profile">
                    <img className="nav_undo" src="/assets/components/undo.png" alt="" />
                </a></div>
            </div>
        </div> 
    </div>
    );
  };

export default userprofileModify;
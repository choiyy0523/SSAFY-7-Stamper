import "./signup.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';


const signup = () => {
    return (
        <div>
            {/* 회원가입 페이지 제목 + 이미지들 */}
                         
          <img className="logo1" src="/src/assets/LOGO.png" alt="" />
            <h2 className='logo2'>회</h2>
            <h2 className="korean_title2">회원가입</h2>
            <br /><br />
            <br />

          <div>             
            <img className="sticker1" src="/src/assets/login/apartment.png" alt="" />
            <img className="sticker2" src="/src/assets/login/bridge.png" alt="" />
            <img className="sticker3" src="/src/assets/login/church.png" alt="" />
            <img className="sticker4" src="/src/assets/login/circus.png" alt="" />
            <img className="sticker5" src="/src/assets/login/tram.png" alt="" />
            <img className="sticker6" src="/src/assets/login/ferris.png" alt="" />
            <img className="sticker7" src="/src/assets/login/ferris2.png" alt="" />
            <img className="sticker8" src="/src/assets/login/forest.png" alt="" />
            <img className="sticker9" src="/src/assets/login/government.png" alt="" />
            <img className="sticker10" src="/src/assets/login/lighthouse.png" alt="" />
            <img className="sticker11" src="/src/assets/login/park.png" alt="" />
            <h1 className="muruk gradtext korean_title"></h1>
          </div>
          <br />

          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' },}} noValidate autoComplete="off"/>

          <div>
          <TextField
          required
          id="outlined-required"
          label="아이디"
          /> <br /><br />

          <TextField
          required
          id="outlined-required"
          label="비밀번호"
          type="password"
          /> <br /><br />

          <TextField
          required
          id="outlined-required"
          label="비밀번호 확인"
          type="password"
          /> <br /><br />

          <TextField
          required
          id="outlined-required"
          label="이름"
          /> <br /><br />

          <TextField
          required
          id="outlined-required"
          label="닉네임"
          />
          </div>



        </div>
    )
}

export default signup;
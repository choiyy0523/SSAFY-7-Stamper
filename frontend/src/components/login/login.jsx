import "./login.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from "@mui/material";

const login = () => {
    return (
      <div>
      {/* 스탬퍼 로고와 이름 */}
        <div>             
          <img className="logo" src="/LOGO.png" alt="" />
          <h2>Stamper</h2>
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
            <img className="sticker12" src="/src/assets/login/eye1.png" alt="" />
            <img className="sticker13" src="/src/assets/login/eye2.png" alt="" />
          <h1 className="gradtext">스탬퍼</h1>
        </div>

      {/* 로그인 관련  */}
        <div>
          <Box component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '320px'},
            }}
            noValidate autoComplete="off"
          >
            <div>
              <TextField id="outlined-id" label="아이디" variant="outlined" type="id" autoComplete="current-id"/>
              <TextField id="outlined-password" label="비밀번호" variant="outlined" type="password" autoComplete="current-password"/>
            </div>
          </Box>
            <br />
          <Button style={{minWidth: '320px'}} variant="contained">로그인</Button>
            <br />
          <div className="between">
            <div>
              <a href="">회원가입</a>
            </div>
            <div>
              <a href="">아이디/비밀번호 찾기</a>
            </div>
          </div>
        </div>
 
      {/* 하단 문구 */}
        <p className="footer_blank">스탬퍼가 되어 서울의 랜드마크를 수집해주세요!</p>
        <p>곳곳에 있는 AI 친구들을 통해 기념도장을 모아보세요!</p>
      
      {/* 출처 표시 Footer */}
        <footer className="footer_blank2">
          <a href="https://www.flaticon.com/authors/freepik" title="LOGO and Components icons">
            <span>Logo and Components icons</span>
            <br />
            <span>created by Freepik - Flaticon</span>
          </a>
        </footer>
      </div>
    );
  };
  
  export default login;
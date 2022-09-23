import "./login.css"

const login = () => {
    return (
      <div>
      {/* 스탬퍼 로고와 이름 */}
        <div>             
          <img class="logo" src="/LOGO.png" alt="" />
          <h2>Stamper</h2>
          <h1 class="gradtext">스탬퍼</h1>
        </div>

      {/* 로그인 관련  */}
        <div>            
          <input type="text" />
            <br />
          <input type="text" />
            <br />
          <input type="submit" />
            <br />
          <div class="between">
            <a href="">회원가입</a>
            <a href="">아이디/비밀번호 찾기</a>
          </div>

        </div>

      {/* 하단 문구 */}
        <p>스탬퍼가 되어 서울의 랜드마크를 수집해주세요!</p>
        <p>곳곳에 있는 AI 친구들을 통해 기념도장을 모아보세요!</p>
      
      {/* 출처 표시 Footer */}
        <a href="https://www.flaticon.com/authors/freepik" title="LOGO and Components icons">Logo and Components icons created by Freepik - Flaticon</a>
      </div>

    );
  };
  
  export default login;
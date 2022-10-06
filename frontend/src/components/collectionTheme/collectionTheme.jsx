import "./collectionTheme.css";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCountOfCategory } from "../../api/book";

const collectionTheme = () => {
  const [gongwon, setGongwon] = useState("공원");
  const [uheung, setUheung] = useState("여흥");
  const [myeongso, setMyeongso] = useState("명소");
  const [munwhasiseol, setMunhwasiseol] = useState("문화시설");
  const [shopping, setShopping] = useState("쇼핑");
  const [jonggyo, setJonggyo] = useState("종교");
  const [bridge, setBridge] = useState("다리");
  const [jeonsigwan, setJeonsigwan] = useState("전시관");
  const [munhwajae, setMunhwajae] = useState("문화재");
  const [jiyeoksangjing, setJiyeoksangjing] = useState("지역상징성");
  const [gucheong, setGucheong] = useState("구청");
  const [guitar, setGuitar] = useState("기타");
  const [forcount, setForcount] = useState([]);
  const [fortotal, setFortotal] = useState([]);

  const userInfo = useSelector((state) => state.UserInfo);
  const userNick = userInfo.userInfo.userNickname;
  const userSeq = userInfo.userInfo.userSeq;
  const token = userInfo.accessToken;

  useEffect(() => {
    getCountOfCategory(
      userSeq,
      token,
      (response) => {
        console.log(response.data.cc);
        let forthem = [];
        forthem[0] = response.data.cc[0].count;
        forthem[1] = response.data.cc[8].count;
        forthem[2] = response.data.cc[4].count;
        forthem[3] = response.data.cc[5].count;
        forthem[4] = response.data.cc[7].count;
        forthem[5] = response.data.cc[10].count;
        forthem[6] = response.data.cc[3].count;
        forthem[7] = response.data.cc[9].count;
        forthem[8] = response.data.cc[6].count;
        forthem[9] = response.data.cc[11].count;
        forthem[10] = response.data.cc[1].count;
        forthem[11] = response.data.cc[2].count;

        let forthem2 = [];
        forthem2[0] = response.data.cc[0].total;
        forthem2[1] = response.data.cc[8].total;
        forthem2[2] = response.data.cc[4].total;
        forthem2[3] = response.data.cc[5].total;
        forthem2[4] = response.data.cc[7].total;
        forthem2[5] = response.data.cc[10].total;
        forthem2[6] = response.data.cc[3].total;
        forthem2[7] = response.data.cc[9].total;
        forthem2[8] = response.data.cc[6].total;
        forthem2[9] = response.data.cc[11].total;
        forthem2[10] = response.data.cc[1].total;
        forthem2[11] = response.data.cc[2].total;

        setForcount(forthem);
        setFortotal(forthem2);
        console.log(userInfo, catList, forthem, forthem2);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h2>{userNick}의 테마별 수집 현황</h2>
      <div id="wrap" className="grid-image">
        <section>
          <a href="/collection/theme/공원">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/gongwon.png"
              alt=""
            />
            <br />
            {gongwon} ( {forcount[0]} / {fortotal[0]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/여흥">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/uheung.png"
              alt=""
            />
            <br />
            {uheung} ( {forcount[1]} / {fortotal[1]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/명소">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/myeongso.png"
              alt=""
            />
            <br />
            {myeongso} ( {forcount[2]} / {fortotal[2]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/문화시설">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/munhwasiseol.png"
              alt=""
            />
            <br />
            {munwhasiseol} ( {forcount[3]} / {fortotal[3]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/쇼핑">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/shopping.png"
              alt=""
            />
            <br />
            {shopping} ( {forcount[4]} / {fortotal[4]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/종교">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/jonggyo.png"
              alt=""
            />
            <br />
            {jonggyo} ( {forcount[5]} / {fortotal[5]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/다리">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/bridge.png"
              alt=""
            />
            <br />
            {bridge} ( {forcount[6]} / {fortotal[6]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/전시관">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/jeonsigwan.png"
              alt=""
            />
            <br />
            {jeonsigwan} ( {forcount[7]} / {fortotal[7]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/문화재">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/munhwajae.png"
              alt=""
            />
            <br />
            {munhwajae} ( {forcount[8]} / {fortotal[8]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/지역상징성">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/jiyeoksangjing.png"
              alt=""
            />
            <br />
            {jiyeoksangjing} ( {forcount[9]} / {fortotal[9]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/구청">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/gucheong.png"
              alt=""
            />
            <br />
            {gucheong} ( {forcount[10]} / {fortotal[10]} )
          </a>
        </section>
        <section>
          <a href="/collection/theme/기타">
            <img
              className="theme_frame theme_icon"
              src="/assets/theme/guitar.png"
              alt=""
            />
            <br />
            {guitar} ( {forcount[11]} / {fortotal[11]} )
          </a>
        </section>
      </div>
    </div>
  );
};

export default collectionTheme;

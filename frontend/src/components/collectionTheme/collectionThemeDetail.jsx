
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { getListByCategory } from '../../api/book';
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { Fragment, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./collectionThemeDetail.css"
import coin from "../../../public/assets/components/coin.png";
import ai from '../../assets/ai.png'
import { borderRadius } from "@mui/system";

const collectionThemeDetail = () => {
    
    const userInfo = useSelector((state) => state.UserInfo);
    const userName = userInfo.userInfo.userName;
    const userNick = userInfo.userInfo.userNickname;
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;

    // const navigate = useNavigate();
    // const bookDetailLink = (bookseq) => {
    //     //navigate(`/landmark/${bookseq}`);
    //     console.log(bookseq);
    // };

    const[fordata, setFordata] = useState([]);
    const[position, setPosition] = useState({
        lat: 0, lng : 0
    });

    let bookCol = [];
    let latAvg = 0;
    let lngAvg = 0;
    let latSum = 0
    let lngSum = 0;

    let theme = useParams().themeNo;
    useEffect(() => {
        getListByCategory(userSeq, theme, token, (response)=>{
          console.log(response.data);
          //setFordata(response.data.totalBookList);
          //console.log(fordata);
          for (var i=0; i<response.data.totalBookList.length; i++){
            let bookObj = new Object();
            bookObj.bookName = response.data.totalBookList[i].bookName;
            bookObj.bookLatitude = response.data.totalBookList[i].bookLatitude;
            bookObj.bookLongitude = response.data.totalBookList[i].bookLongitude;
            bookObj.bookGugun = response.data.totalBookList[i].bookGugun;
            bookObj.bookSeq = response.data.totalBookList[i].bookSeq;
            bookObj.bookAddress = response.data.totalBookList[i].bookAddress;
            bookObj.collected = "미수집";
            latSum += response.data.totalBookList[i].bookLatitude;
            lngSum += response.data.totalBookList[i].bookLongitude;

            for (var j=0; j<response.data.collectedBookList.length; j++){
                if (response.data.totalBookList[i].bookSeq == response.data.collectedBookList[j].book.bookSeq){
                    bookObj.collected = "수집완료";
                }
}

            bookCol.push(bookObj);
          }

        console.log(bookCol);

        setFordata(bookCol);
 
        //console.log(fordata);

        latAvg = latSum / response.data.totalBookList.length;
        lngAvg = lngSum / response.data.totalBookList.length;


        setPosition({lat : latAvg, lng : lngAvg});


        }, (error)=>{
          console.log(error)
        })
      }, [])
      const bookArr = bookCol;
      
      return (<div><div className="seoul_title">{theme}
      <span className="span_effect">&nbsp;</span>
      <span className="span_effect">수</span>
      <span className="span_effect">집</span>
      <span className="span_effect">&nbsp;</span>
      <span className="span_effect">현</span>
      <span className="span_effect">황</span>
       </div>
          <div className="container map_center">
            <Map
            center={{ lat: position.lat, lng: position.lng}}
            style={{ width: "23rem", height: "30rem", borderStyle: "groove", borderRadius:"1em"}}
            level={9}
            >
                    {fordata.map((item)=>{

if (item.collected == "수집완료"){
    return (
        <MapMarker key = {item.bookName} position={{ lat: item.bookLatitude, lng: item.bookLongitude }}
        image={{
            src: "/assets/Compl.png", // 마커이미지의 주소입니다
            size: {
            width: 32,
            height: 35,
            }, // 마커이미지의 크기입니다
            options: {
            offset: {
                x: 16,
                y: 35,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
        }}
        >
            <div style={{padding: "5px", color:"#000", width:"155px"}}>{item.bookName}</div>
        </MapMarker>
    );
}

else {
    return (
        <MapMarker key = {item.bookName} position={{ lat: item.bookLatitude, lng: item.bookLongitude }}
        image={{
            src: "/assets/no.png", // 마커이미지의 주소입니다
            size: {
            width: 32,
            height: 35,
            }, // 마커이미지의 크기입니다
            options: {
            offset: {
                x: 16,
                y: 35,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
        }}
        >
            <div style={{padding: "5px", color:"#000", width:"155px"}}>{item.bookName}</div>
        </MapMarker>
    );
}
})}
            </Map>
        </div>


        <div className="map_center">
            <table className="list_left list_border" style={{borderCollapse:'collapse'}}>
                <thead>
                    <tr className="under_border" style={{borderBottom:'3px solid white'}}>
                        <th className="">이름</th>
                        {/* <th>주소</th> */}
                        <th className="list_right">수집여부</th>
                    </tr>
                </thead>
                <tbody>
                    {fordata.map((item)=>{
                        return (
                            <tr>
                            <td className="list_border"><a href = {`/landmark/${item.bookSeq}`}>{item.bookName}</a></td>
                            {/* <td>{item.bookAddress}</td> */}
                            <td className="list_right">{item.collected === "수집완료" ? <img style={{height:'20px', width:'20px'}} src={coin}></img> : <img style={{height:'20px', width:'20px'}}></img>}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )

}

export default collectionThemeDetail;
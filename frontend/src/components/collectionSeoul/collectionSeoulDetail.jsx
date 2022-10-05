
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { getListByGugun } from '../../api/book';
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { Fragment, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const collectionSeoulDetail = () => {
    
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

    let gugun = useParams().districtNo;
    useEffect(() => {
        getListByGugun(userSeq, gugun, token, (response)=>{
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

    return (<div>{useParams().districtNo} 수집 현황
        <div>
            <Map
            center={{ lat: position.lat, lng: position.lng}}
            style={{ width: "100%", height: "360px" }}
            level={7}
            >
                    {fordata.map((item)=>{
                        return (
                            <MapMarker position={{ lat: item.bookLatitude, lng: item.bookLongitude }}>
                                <div style={{color:"#000"}}>{item.bookName}</div>
                            </MapMarker>
                        );
                    })}
            </Map>
        </div>


        <div>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>주소</th>
                        <th>수집여부</th>
                    </tr>
                </thead>
                <tbody>
                    {fordata.map((item)=>{
                        return (
                            <tr>
                            <td><a href = {`/landmark/${item.bookSeq}`}>{item.bookName}</a></td>
                            <td>{item.bookAddress}</td>
                            <td>{item.collected}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )

}

export default collectionSeoulDetail;
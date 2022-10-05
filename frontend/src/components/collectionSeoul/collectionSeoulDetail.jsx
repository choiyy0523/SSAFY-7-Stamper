import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { getListByGugun } from '../../api/book';
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useState, useRef} from 'react';

const collectionSeoulDetail = () =>{

    const[fordata, setFordata] = useState({
        arr : [],
    });

    let bookCol = [];

    let gugun = useParams().districtNo;
    useEffect(() => {
        getListByGugun(2, gugun, '654787', (response)=>{
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

            for (var j=0; j<response.data.collectedBookList.length; j++){
                if (response.data.totalBookList[i].bookSeq == response.data.collectedBookList[j].book.bookSeq){
                    bookObj.collected = "수집완료";
                }
            }

            bookCol.push(bookObj);
          }

        console.log(bookCol);

        setFordata(bookCol);
 
        console.log(fordata);


        }, (error)=>{
          console.log(error)
        })
      }, [])
      const bookArr = bookCol;

    return (<div>{useParams().districtNo} 수집 현황
        <div>
            <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "100%", height: "360px" }}
            >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{color:"#000"}}>Hello World!</div>
            </MapMarker>

            <MapMarker position={{ lat: 33.55635, lng: 127 }}>
                <div style={{color:"#000"}}>no!</div>
            </MapMarker>
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
                    {bookCol.map((item)=>{
                        return (
                            <tr>
                            <td>{item.bookName}</td>
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
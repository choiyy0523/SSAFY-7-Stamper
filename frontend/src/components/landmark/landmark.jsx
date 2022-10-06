import { useParams } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookDetail } from '../../api/book';
import { useSelector } from 'react-redux';
import { getCommentList, registerComment, deleteComment } from '../../api/comment';
import { Fragment, useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import imageUpload from '../../assets/imageupload.png'
import { display } from '@mui/system';
import approved from '../../assets/approved.png'
import './landmark.css'
import { Button } from "@mui/material";
import { registerUserbookCollection } from "../../api/book";
import processing from "../../assets/processing.gif";
import exifr from "exifr";
import ai from "../../assets/ai.png";
import location from "../../assets/placeholder.png";
import axios from "axios";

import Swal from 'sweetalert2'

export default function landmark() {
  const [imageURL, setImageURL] = useState("");
  const [landmarkName, setLandmarkName] = useState("");
  const [landmarkDesc, setLandmarkDesc] = useState("");
  const [landmarkComment, setLandmarkComment] = useState([]);

    const [landmarkInfo, setLandmarkInfo] = useState([]);
    const [district, setDistrict] = useState('default');
    const [inputLatitude, setInputLatitude] = useState(0);
    const [inputLongitude, setInputLongitude] = useState(0);
    const [image, setImage] = useState(null);
    const [url, setURL] = useState('');
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [predictionArr,setPredictionArr]=useState([]);
    const [result,setResult]=useState(null);
    const [resultName,setResultName]=useState(null);
    const [resultPercent, setReSultPercent] = useState();
    const [locationApproved, setLocationApproved] = useState(null);
    const [aiIcon, setAiIcon] = useState(ai);
    const [locationIcon, setLocationIcon] = useState(location);
    const [commentContent, setCommentContent] = useState('');
    const fileRef = useRef();

  const [modal, setModal] = useState(false);

  


  const baseURL =
    "https://stamperimage.s3.ap-northeast-2.amazonaws.com/defaultimg/";

  const landmarkNo = useParams().landmarkNo;

  const userInfo = useSelector((state) => state.UserInfo);
  const userName = userInfo.userInfo.userName;
  const userNick = userInfo.userInfo.userNickname;
  const userSeq = userInfo.userInfo.userSeq;
  const token = userInfo.accessToken;

  useEffect(() => {
    getBookDetail(userSeq, landmarkNo, (response) => {
      const data = response.data;
// =======
//     useEffect(() => {
//         getBookDetail(userSeq, landmarkNo, (response)=>{
//             setLandmarkInfo(response.data.book)
//             console.log(landmarkInfo)
//         }, (error)=>{
//             console.log(error)
//         })
//     }, [])
// >>>>>>> jaehyun

      setLandmarkName(data.book.bookName);
      setLandmarkDesc(data.book.bookDescription);

      let tempURL = baseURL;
      if (!data.userBook) {
        // 수집하지 않은 도감의 경우 기본이미지로 url 저장
        tempURL += data.book.bookImageURL;
        setImageURL(tempURL);
      } else {
        tempURL = data.userBook.userbookCollectionImage;
        setImageURL(tempURL);
      }
    });
    getCommentList(landmarkNo, token, (response) => {
      const data = response.data;

      setLandmarkComment(data.list);
    });
  }, []);

  useEffect(() => {
    getBookDetail(
      userSeq,
      landmarkNo,
      (response) => {
        setLandmarkInfo(response.data.book);
        console.log(landmarkInfo);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  console.log(landmarkInfo);
  let model;

  const longLatExtraction = async () => {
    let { latitude, longitude } = await exifr.gps(url);
    setInputLatitude(latitude);
    setInputLongitude(longitude);
    console.log({ latitude, longitude });
  };
  useEffect(() => {
    longLatExtraction();
  }, [url]);

  const changeImage = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    console.log(file, reader);

    reader.onloadend = (e) => {
      setImage(file);
      setURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
    longLatExtraction();
  };

  function changeDistrict(event) {
    setDistrict(event.target.value);
    console.log(district);
  }

  const districtList = {
    default: "Xv6R4lzoj",
    강남구: "Xv6R4lzoj",
    강동구: "IUV1IAdyW",
    강북구: "TLvH5uNNR",
    강서구: "P96Nksg3F",
    관악구: "Ak_ufKSa3",
    광진구: "BHBoxcBC5",
    구로구: "UCsiDpz1Y",
    금천구: "1rLl9t7Gm",
    노원구: "pHeh9Am42",
    도봉구: "Rcqrvtk4W",
    동대문구: "Xsnd-a9AT",
    동작구: "oKP1WTd5R",
    마포구: "DW5OcMjLD",
    서대문구: "0XkmIdOS6",
    서초구: "ug9V1Jxw-",
    성동구: "kncHgEjTR",
    성북구: "XhtA3LDT6",
    송파구: "81n5pSJwq",
    양천구: "AYqPL8Ep6",
    영등포구: "N2UXqj3Yg",
    용산구: "8Ar0wuZ0n",
    은평구: "z14z0WGp3",
    종로구: "wR4Iolw-n",
    중구: "9JVSZ0SaY",
    중랑구: "3g1zdwWqe",
  };

  // const districtURL = `https://teachablemachine.withgoogle.com/models/${districtList.district}/`;
  // let districtURL = `https://teachablemachine.withgoogle.com/models/${districtList.district}/`;

  let districtURL = `https://teachablemachine.withgoogle.com/models/${
    districtList[landmarkInfo.bookGugun]
  }/`;

  async function predict() {
    setLoading(true);
    console.log(districtURL);
    let modelURL = districtURL + "model.json";
    let metadataURL = districtURL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    const inputImage = document.getElementById("targetImage");
    const prediction = await model.predict(inputImage, false);
    prediction.sort(
      (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
    );
    setPredictionArr(prediction);
    setShowResult(true);
    setLoading(false);

    let least = 0;
    for (var i = 0; i < prediction.length; i++) {
      console.log(landmarkInfo.bookName);
      if (prediction[i].className == landmarkInfo.bookName) {
        least = prediction[i].probability.toFixed(2);
        if (least < 0.2) {
          setResult(landmarkInfo.bookName + " 0.2");
          setReSultPercent(0.2);
        } else {
          setResult(
            prediction[i].className + " " + prediction[i].probability.toFixed(2)
          );
          setReSultPercent(prediction[i].probability.toFixed(2));
          setResultName(prediction[i].className);
        }
      }
    }
    // if () {

    // }
    // else {
    //     return false
    // }
    console.log(
      "답: ",
      prediction[0].className + prediction[0].probability.toFixed(2)
    );
    console.log(
      "답: ",
      prediction[1].className + prediction[1].probability.toFixed(2)
    );
    console.log(
      "답: ",
      prediction[2].className + prediction[2].probability.toFixed(2)
    );
  }

  async function register() {
    let val = false;
    if (resultPercent < 0.5) {
      //val = confirm("확률이 낮습니다. 등록하시겠습니까?");

      await Swal.fire({
        title: "확률이 낮습니다. 등록하시겠습니까?",
        icon: 'warning',
        
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '등록', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        
        reverseButtons: true, // 버튼 순서 거꾸로
        
     }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
           val = true;
        }
     });
    } else {
      //val = confirm("등록하시겠습니까?");
      await Swal.fire({
        title: "등록하시겠습니까?",
        icon: 'warning',
        
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '등록', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        
        reverseButtons: true, // 버튼 순서 거꾸로
        
     }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        
           val = true;
        }
     });
    }
    if (val) {
      let ubcImage = "";

      let formData = new FormData();
      let fileData = document.getElementById("file").files[0];
      formData.append("file", fileData);

      axios
        .post(
          `https://j7a206.p.ssafy.io:8080/api/file/${userSeq}/${landmarkNo}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("upload success");
          console.log("url : ");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("upload fail");
          console.log(error);
        });
      // let today = new Date();
      // let year = today.getFullYear();
      // let month = today.getMonth()
      // let datenow = today.getDate();
      // let hours = today.getHours(); // 시
      // let minutes = today.getMinutes();  // 분
      // let seconds = today.getSeconds();  // 초
      // let milliseconds = today.getMilliseconds(); // 밀리초

      // let ubcImage = year+""+month+""+datenow+""+ hours +"" + minutes + "" + seconds + "" + milliseconds + "" + userSeq + "" + landmarkNo;

      let userbookCollectionInfo = {
        bookSeq: landmarkNo,
        category: landmarkInfo.bookMaincategory,
        gugun: landmarkInfo.bookGugun,
        userSeq: userSeq,
        userbookCollectionImage: ubcImage,
      };

      registerUserbookCollection(
        userbookCollectionInfo,
        token,
        (response) => {},
        (error) => {
          console.log(error);
        }
      );

      if (resultPercent < 0.5) {
        await Swal.fire(
          '등록되었습니다.',
          '검토 후 AI 모델 학습에 반영하겠습니다.',
          'success'
        )
      } else {
        await Swal.fire(
          '등록되었습니다.',
          'success'
        )
      }


      window.location.reload();
    }
  }
  function getDistance(latitude1, longitude1, latitude2, longitude2) {
    console.log(latitude1);
    console.log(latitude2);
    console.log(longitude1);
    console.log(longitude2);
    let p = 0.017453292519943295; //This is  Math.PI / 180
    let c = Math.cos;
    let a =
      0.5 -
      c((latitude2 - latitude1) * p) / 2 +
      (c(latitude1 * p) *
        c(latitude2 * p) *
        (1 - c((longitude2 - longitude1) * p))) /
        2;
    let R = 6371; //  Earth distance in km so it will return the distance in km
    let dist = 2 * R * Math.asin(Math.sqrt(a));
    console.log(R);
    console.log(dist);
    if (dist <= 5) {
      return "Approved!";
    } else {
      return "Too Far!";
    }
  }

  useEffect(() => {
    const locationApprove = getDistance(
      landmarkInfo.bookLatitude,
      landmarkInfo.bookLongitude,
      inputLatitude,
      inputLongitude
    );
    if (locationApprove === "Approved!") {
      setLocationApproved(true);
    } else {
      setLocationApproved(false);
    }
  }, [inputLongitude]);

  useEffect(() => {
    if (loading === true) {
      setAiIcon(processing);
    }
    if (landmarkName === resultName) {
      setAiIcon(approved);
    }
  }, [loading, resultName]);

    function commentPost(event) {
        event.preventDefault();
        let input = {userSeq: userSeq, bookSeq: landmarkNo, commentContent:commentContent};
        registerComment(input, token);
        window.location.reload();
    }

    function eraseComment(commentSeq) {
        //event.preventDefault();
        //let input = {commentSeq:commentSeq};
        confirm('삭제하시겠습니까?');
        deleteComment(commentSeq, token);
        alert('삭제되었습니다.');
        window.location.reload();
    }

  return (
    <div>
      <div>
        <div style={{ fontSize: "40px", margin: "8px" }}>{landmarkName}</div>
        <div>
            <img style={{height:'200px', width:'200px', marginTop:'8px', marginBottom:'20px'}} src={imageURL} alt={landmarkName}></img>
        </div>
        <div style={{ width:'80vw', textAlign:'center', margin:'auto'}}>{landmarkDesc}</div>
        <div style={{display:'flex', marginLeft:'12px', marginTop:'25px', marginRight:'8px', marginBottom:'20px'}}>
            <TextField style={{width:'80vw'}} onChange={(event) => setCommentContent(event.target.value)}></TextField>
            <button style={{backgroundColor:'rgba(191, 96, 255, 0.8)', marginLeft:'10px', fontSize:'12px'}} onClick={commentPost}>등록</button>
        </div>
        <div style={{ margin:'auto', borderRadius:7 ,width:'97vw'}}>
                <table>
                    {/* <thead>
                        <tr style={{display:'flex', flexDirection:'column'}}>
                            <th>작성자:</th>
                            <th>내용:</th>
                            <th>작성일자:</th>
                        </tr>
                    </thead> */}
                        {landmarkComment.map((item) => {
                            return (
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <div style={{padding:'2px', marginBottom:'15px', backgroundColor:'rgba(191, 96, 255, 0.8)', borderRadius:5}}>{item.user.userNickname}:</div>
                                    <div style={{marginTop:'2px', marginLeft:'15px', marginBottom:'15px'}}>{item.commentContent}</div>
                                    {item.user.userNickname === userName ? <button style={{marginTop:'2px', fontSize:'5px', marginLeft:'15px', marginBottom:'15px', border:'0px', padding:'0px'}} onClick={()=>{eraseComment(item.commentSeq)}}>삭제</button> : <div></div>}
                                </div>
                                // <tr style={{marginBottom:'15px'}}>
                                //     <td style={{marginBottom:'15px'}}>{item.user.userNickname}</td>
                                //     <td style={{marginBottom:'15px'}}>{item.commentContent}</td>
                                // </tr>
                            );
                        })}
                </table>
        </div>
      </div>
      <div>
        <h1>랜드마크 등록</h1>
        <div>
          {image ? (
            <img
              id="targetImage"
              src={url}
              style={{ padding: "10px" }}
              width="300px"
              height="300px"
            ></img>
          ) : (
            <div></div>
          )}
        </div>
        <div>{result ? <div>{result}</div> : <div></div>}</div>
        <div></div>
        <div>
          <label>
            <img
              style={{
                height: "300px",
                width: "300px",
                padding: "10px",
                display: `${image ? "none" : null}`,
              }}
              src={imageUpload}
              alt="imageUploadButton"
            ></img>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              ref={fileRef}
              name="profile_img"
              id="file"
              onChange={changeImage}
            ></input>
          </label>
        </div>
        {result ? (
          <Button color="secondary" onClick={register}>
            등록
          </Button>
        ) : (
          <Button color="secondary" onClick={predict}>
            검증
          </Button>
        )}
        <div>
          <img
            style={{ height: "100px", width: "100px", margin: "30px" }}
            src={aiIcon}
          ></img>
          {locationApproved === true ? (
            <img
              style={{ height: "100px", width: "100px", margin: "30px" }}
              src={approved}
            ></img>
          ) : (
            <img
              className="processing"
              style={{ margin: "30px", height: "100px", width: "100px" }}
              src={location}
            ></img>
          )}
          <br />
          <br />
          <span className="grayfont">
            ※건물 디자인 변경, 현수막, 디스플레이, 리모델링, 재건축 등으로 인해
            인식이 불안정할 수 있습니다※
          </span>
        </div>
      </div>
    </div>
  );
}

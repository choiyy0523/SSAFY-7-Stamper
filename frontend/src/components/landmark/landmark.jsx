import { useParams } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookDetail } from '../../api/book';
import { useSelector } from 'react-redux';
import { getCommentList } from '../../api/comment';
import { Fragment, useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import imageUpload from '../../assets/imageupload.png'
import { display } from '@mui/system';
import approved from '../../assets/approved.png'
import './landmark.css'
import { Button } from "@mui/material";
import { registerUserbookCollection } from '../../api/book';
import processing from '../../assets/processing.gif'
import exifr from 'exifr'
import ai from '../../assets/ai.png'
import location from '../../assets/placeholder.png'

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
    const fileRef = useRef();

    const [modal, setModal] = useState(false);

    const baseURL = "https://stamperimage.s3.ap-northeast-2.amazonaws.com/defaultimg/";

    const landmarkNo = useParams().landmarkNo;

    const userInfo = useSelector((state) => state.UserInfo);
    const userName = userInfo.userInfo.userName;
    const userNick = userInfo.userInfo.userNickname;
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;

    useEffect(() => {
        getBookDetail(userSeq, landmarkNo, (response) => {
            const data = response.data;

            setLandmarkName(data.book.bookName);
            setLandmarkDesc(data.book.bookDescription);


            let tempURL = baseURL;
            if (!data.userBook) {
                // 수집하지 않은 도감의 경우 기본이미지로 url 저장
                tempURL += data.book.bookImageURL;
                setImageURL(tempURL);
            } else {
                tempURL += data.userBook.userbookCollectionImage;
                setImageURL(tempURL);
            }
        });
        getCommentList(landmarkNo, token, (response) => {
            const data = response.data;

            setLandmarkComment(data.list);
        })
    }, [])

    

    useEffect(() => {
        getBookDetail(userSeq, landmarkNo, (response)=>{
            setLandmarkInfo(response.data.book)
            console.log(landmarkInfo)
        }, (error)=>{
            console.log(error)
        })
    }, [])

    console.log(landmarkInfo)
    let model

    const longLatExtraction = async () => {
        let {latitude, longitude} = await exifr.gps(url)
        setInputLatitude(latitude)
        setInputLongitude(longitude)
        console.log({latitude, longitude})
    };
    useEffect(() => {
        longLatExtraction()
    }, [url])

    const changeImage = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        console.log(file, reader)
    
        reader.onloadend = (e) => {
          setImage(file);
          setURL(reader.result);
        };
        if (file) reader.readAsDataURL(file);
        longLatExtraction();
        };

    function changeDistrict(event) {
        setDistrict(event.target.value)
        console.log(district)
    }

    const districtList = {'default':'Xv6R4lzoj',
                        '강남구':'Xv6R4lzoj', 
                        '강동구':'IUV1IAdyW', 
                        '강북구':'TLvH5uNNR', 
                        '강서구':'P96Nksg3F', 
                        '관악구':'Ak_ufKSa3', 
                        '광진구':'BHBoxcBC5', 
                        '구로구':'UCsiDpz1Y', 
                        '금천구':'1rLl9t7Gm', 
                        '노원구':'pHeh9Am42', 
                        '도봉구':'Rcqrvtk4W',
                        '동대문구':'Xsnd-a9AT',
                        '동작구':'oKP1WTd5R',
                        '마포구':'DW5OcMjLD', 
                        '서대문구':'0XkmIdOS6',
                        '서초구':'ug9V1Jxw-',
                        '성동구':'kncHgEjTR',
                        '성북구':'XhtA3LDT6',
                        '송파구':'81n5pSJwq',
                        '양천구':'AYqPL8Ep6',
                        '영등포구':'N2UXqj3Yg',
                        '용산구':'8Ar0wuZ0n', 
                        '은평구':'z14z0WGp3',
                        '종로구':'wR4Iolw-n',
                        '중구':'9JVSZ0SaY',
                        '중랑구':'3g1zdwWqe'}

    // const districtURL = `https://teachablemachine.withgoogle.com/models/${districtList.district}/`;
    // let districtURL = `https://teachablemachine.withgoogle.com/models/${districtList.district}/`;

    let districtURL = `https://teachablemachine.withgoogle.com/models/${districtList[landmarkInfo.bookGugun]}/`;

    async function predict() {
        setLoading(true)
        console.log(districtURL)
        let modelURL = districtURL + 'model.json';
        let metadataURL = districtURL + 'metadata.json';
        model = await tmImage.load(modelURL, metadataURL);
        const inputImage = document.getElementById('targetImage')
        const prediction = await model.predict(inputImage, false);
        prediction.sort((a,b) => parseFloat(b.probability) - parseFloat(a.probability))
        setPredictionArr(prediction)
        setShowResult(true)
        setLoading(false)

        let least = 0;
        for (var i=0; i<prediction.length; i++){
            console.log(landmarkInfo.bookName);
            if (prediction[i].className == landmarkInfo.bookName){
                least = prediction[i].probability.toFixed(2)
                if (least < 0.2){
                    setResult(landmarkInfo.bookName+ " 0.2")
                    setReSultPercent(0.2)
                }
                else {
                    setResult(prediction[i].className + " " + prediction[i].probability.toFixed(2));
                    setReSultPercent(prediction[i].probability.toFixed(2))
                    setResultName(prediction[i].className);
                }
            }
        }
        // if () {

        // }
        // else {
        //     return false
        // }
        console.log('답: ', prediction[0].className + prediction[0].probability.toFixed(2));
        console.log('답: ', prediction[1].className + prediction[1].probability.toFixed(2));
        console.log('답: ', prediction[2].className + prediction[2].probability.toFixed(2));
    }

    function register(){
        
        let val = false;
        if (resultPercent < 0.5){
            val = confirm("확률이 낮습니다. 등록하시겠습니까?");
        } else{
            val = confirm("등록하시겠습니까?")
        }
        
        if (val){
            let today = new Date();    
            let year = today.getFullYear();
            let month = today.getMonth()
            let datenow = today.getDate();
            let hours = today.getHours(); // 시
            let minutes = today.getMinutes();  // 분
            let seconds = today.getSeconds();  // 초
            let milliseconds = today.getMilliseconds(); // 밀리초
            
            let ubcImage = year+""+month+""+datenow+""+ hours +"" + minutes + "" + seconds + "" + milliseconds + "" + userSeq + "" + landmarkNo;

            let userbookCollectionInfo = {
                "bookSeq" : landmarkNo,
                "category" : landmarkInfo.bookMaincategory,
                "gugun":landmarkInfo.bookGugun,
                "userSeq":userSeq,
                "userbookCollectionImage": ubcImage
            };

            registerUserbookCollection(userbookCollectionInfo, token, (response)=>{

            }, (error)=>{
                console.log(error)
            })

            if (resultPercent < 0.5){
                alert("등록되었습니다. 검토 후 AI 모델 학습에 반영하겠습니다.");
            } else{
                alert("등록되었습니다.")
            }
        }



    }
    function getDistance(latitude1,longitude1,latitude2,longitude2) {
        console.log(latitude1)
        console.log(latitude2)
        console.log(longitude1)
        console.log(longitude2)
        let p = 0.017453292519943295;    //This is  Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((latitude2 - latitude1) * p)/2 + 
                c(latitude1 * p) * c(latitude2 * p) * 
                (1 - c((longitude2 - longitude1) * p))/2;
        let R = 6371; //  Earth distance in km so it will return the distance in km
        let dist = 2 * R * Math.asin(Math.sqrt(a)); 
        console.log(R)
        console.log(dist)
        if (dist <= 5) {
            return "Approved!"
        }
        else {
            return "Too Far!"
        }; 
      }
    
    useEffect(()=> {
        const locationApprove = getDistance(landmarkInfo.bookLatitude, landmarkInfo.bookLongitude, inputLatitude, inputLongitude)
        if (locationApprove === "Approved!") {
            setLocationApproved(true)
        }
        else{setLocationApproved(false)}
    },[inputLongitude])

    useEffect(()=> {
        if(loading === true) {setAiIcon(processing)}
        if(landmarkName === resultName) {setAiIcon(approved)}
    },[loading, resultName])

    return (

    <div>
            <div>
            <div>{landmarkName}</div>
        <div>
            <img width = '50%' src={imageURL} alt={landmarkName}></img>
        </div>
        <div>
                <p>대충 설명</p>
                <p>{landmarkDesc}</p>
        </div>
        <button>수집</button>
        <div>
            <TextField></TextField>
            <button>등록</button>
        </div>
        <div>
            <aside>
                <img src='/assets/LOGO2.png' alt="LOGO2" width="30" height="30"></img>
                </aside>
                <table>
                    <thead>
                        <tr>
                            <th>작성자</th>
                            <th>내용</th>
                            <th>작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {landmarkComment.map((item) => {
                            return (
                                <tr>
                                    <td>{item.user.userNickname}</td>
                                    <td>{item.commentContent}</td>
                                    <td>{item.commentDate}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
        </div>
        <button>더보기</button>
            </div>
            <br />
            <hr /><hr /><hr /><hr />
            <br />
        <div>
            <h1>랜드마크 등록</h1>
            <div>
                {image? <img id='targetImage' src={url} style={{padding:'10px'}}width='300px' height='300px'></img> : <div></div>}
            </div>
            <div>
                {result? <div>{result}</div> : <div></div>}
            </div>
            <div>
            </div>
            <div>
                <label>
                    <img style={{height:'300px', width:'300px', padding:'10px', display:`${image? 'none' : null}`}} src={imageUpload} alt='imageUploadButton'></img>
                    <input style={{display:'none'}} type='file' accept="image/*" ref={fileRef} name="profile_img" id="file" onChange={changeImage}></input>
                </label>
            </div>
            {result && locationApproved ? <Button color="secondary" onClick={register}>등록</Button> : <Button color="secondary" onClick={predict}>검증</Button>}
            <div>
                <img style={{height:'100px', width:'100px', margin:'30px'}} src={aiIcon}></img>
                {locationApproved === true ? <img style={{height:'100px', width:'100px', margin:'30px'}} src={approved}></img> : <img className='processing' style={{ margin:'30px', height:'100px', width:'100px'}} src={location}></img>}
                <br />
                <br/>
                <span className='grayfont'>
                ※건물 디자인 변경, 현수막, 디스플레이, 리모델링, 재건축 등으로 인해 인식이 불안정할 수 있습니다※
                </span>
            </div>

        </div>
    </div>

    )
}
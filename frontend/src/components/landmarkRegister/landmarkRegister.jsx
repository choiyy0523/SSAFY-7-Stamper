import { Fragment, useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import imageUpload from '../../assets/imageupload.png'
import { display } from '@mui/system';
import approved from '../../assets/approved.png'
import { useParams } from 'react-router-dom';
import './landmarkRegister.css'
import { Button } from "@mui/material";
import { getBookDetail } from '../../api/book';
import processing from '../../assets/processing.gif'
import { useQuery } from '@tanstack/react-query';
import landmark from '../landmark/landmark';
import exifr from 'exifr'
import ai from '../../assets/ai.png'
import location from '../../assets/placeholder.png'

export default function landmarkRegister() {
    const landmarkNo = useParams();
    const [landmarkInfo, setLandmarkInfo] = useState({});
    const [district, setDistrict] = useState('default');
    const [inputLatitude, setInputLatitude] = useState(0);
    const [inputLongitude, setInputLongitude] = useState(0);
    const [image, setImage] = useState(null);
    const [url, setURL] = useState('');
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [predictionArr,setPredictionArr]=useState([]);
    const [result,setResult]=useState(null);
    const [locationApproved, setLocationApproved] = useState(null);
    const [aiIcon, setAiIcon] = useState(ai);
    const [locationIcon, setLocationIcon] = useState(location);
    const fileRef = useRef();

    useEffect(() => {
        getBookDetail(2, 30, (response)=>{
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
        setResult(prediction[0].className)
        // if () {

        // }
        // else {
        //     return false
        // }
        console.log('답: ', prediction[0].className + prediction[0].probability.toFixed(2));
        console.log('답: ', prediction[1].className + prediction[1].probability.toFixed(2));
        console.log('답: ', prediction[2].className + prediction[2].probability.toFixed(2));
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
        if(landmarkInfo.bookName === result) {setAiIcon(approved)}
    },[loading, result])



    return (
        <div>
            <h1>랜드마크 등록</h1>
            {/* <div style={{margin:'10px'}}>
                <select name='district' id='districtSelection' onChange={changeDistrict}>
                    <option value=''>지역을 선택해주세요.</option>
                    <option value='강남구'>강남구</option>
                    <option value='강동구'>강동구</option>
                    <option value='강북구'>강북구</option>
                    <option value='강서구'>강서구</option>
                    <option value='관악구'>관악구</option>
                    <option value='광진구'>광진구</option>
                    <option value='구로구'>구로구</option>
                    <option value='금천구'>금천구</option>
                    <option value='노원구'>노원구</option>
                    <option value='도봉구'>도봉구</option>
                    <option value='동대문구'>동대문구</option>
                    <option value='동작구'>동작구</option>
                    <option value='마포구'>마포구</option>
                    <option value='서대문구'>서대문구</option>
                    <option value='서초구'>서초구</option>
                    <option value='성동구'>성동구</option>
                    <option value='성북구'>성북구</option>
                    <option value='송파구'>송파구</option>
                    <option value='양천구'>양천구</option>
                    <option value='영등포구'>영등포구</option>
                    <option value='용산구'>용산구</option>
                    <option value='은평구'>은평구</option>
                    <option value='종로구'>종로구</option>
                    <option value='중구'>중구</option>
                    <option value='중랑구'>중랑구</option>
                </select>
            </div> */}
            <div>
                {image? <img id='targetImage' src={url} style={{padding:'10px'}}width='300px' height='300px'></img> : <div></div>}
            </div>
            <div>
                {result? <div>{result}</div> : <div></div>}
            </div>
            <div>
                <label>
                    <img style={{height:'300px', width:'300px', padding:'10px', display:`${image? 'none' : null}`}} src={imageUpload} alt='imageUploadButton'></img>
                    <input style={{display:'none'}} type='file' accept="image/*" ref={fileRef} name="profile_img" id="file" onChange={changeImage}></input>
                </label>
            </div>
            <Button color="secondary" onClick={predict}>검증</Button>
            <div>
                <img style={{height:'100px', width:'100px', margin:'30px' }} src={aiIcon}></img>
                {locationApproved === true ? <img style={{height:'100px', width:'100px', margin:'30px'}} src={approved}></img> : <img className='basic' style={{ margin:'30px', height:'100px', width:'100px'}} src={location}></img>}
                <br />
                <span className='grayfont'>
                * 건물 디자인 변경, 현수막, 디스플레이, 리모델링, 재건축 등으로 인해 인식이 불안정할 수 있습니다. *
                </span>
                <br />
                <br />
                <span className='grayfont'>
                * 랜드마크 등록에 사용되는 이미지 파일은 '스탬퍼' 서비스 저장소에 별도로 저장되므로
                <br />
                개인정보, 사생활, 제출 서류 등이 민감한 정보가 포함된 사진은 게시를 금합니다. *
                </span>
            </div>
        </div>

    )
}

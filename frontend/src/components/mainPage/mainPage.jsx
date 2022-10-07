import "./mainPage.css"
import * as React from 'react';
import { Fragment, useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import seoul from "../../../public/assets/components/seoul.png";
import themepark from "../../../public/assets/components/theme-park.png";
import assistant from "../../../public/assets/components/assistant.png";
import house from "../../../public/assets/components/house.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookDetail, getCountOfCategory, getCountOfGugun } from "../../api/book";
import { getAchieveList } from "../../api/achieve";

export default function ImageTest() {
    
    const dispatch = useDispatch();
    const [district, setDistrict] = useState('default');
    const [image, setImage] = useState(null);
    const [url, setURL] = useState('');
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [predictionArr,setPredictionArr]=useState([]);
    const [result,setResult]=useState(null);
    const fileRef = useRef();

    const userInfo = useSelector((state) => state.UserInfo);
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;

    let model

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

    let districtURL = `https://teachablemachine.withgoogle.com/models/${districtList[district]}/`;

    async function predict() {
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
        console.log('답: ', prediction[0].className + prediction[0].probability.toFixed(2));
        console.log('답: ', prediction[1].className + prediction[1].probability.toFixed(2));
        console.log('답: ', prediction[2].className + prediction[2].probability.toFixed(2));
    }

    useEffect(() => {
        getAchieveList(userSeq, token, (response)=>{
            console.log(response.data.achieveList);
        }, (error)=>{
            console.log(error);
        })

    },[])
    return (

        <Fragment>
            <div>
                <div className="between widthcenter" >
                    <div className="colorblock container logo_name flex-column">
                        <a href="/collection/seoul/index" className="bigfont inner-div">
                        <img className="main_comp flex-column" src={seoul} alt="" />구별</a>
                    </div>
                    <div className="colorblock container flex-column">
                        <a href="/collection/theme/index" className="bigfont inner-div">
                        <img className="main_comp flex-column" src={themepark} alt="" />테마별</a>
                    </div>
                </div>
            <div className="mypage_top">
                <div className="colorblock3 container flex-column">
                    <a href="/profile" className="bigfont inner-div">
                        <img className="main_comp2 container flex-column" src={house} alt="" />마이페이지</a>
                </div>
            </div>

            <div className="darm_kkol">&lt;랜드마크 닮은꼴 찾기></div>
            {/* <img className="main_comp blur_darm robot_dance" src={assistant} alt="" style={{display: `${image ? "none" : null}`}}/> */}


        </div> 
            <div>
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
            </div>
            <div>
                {image? <img id='targetImage' src={url} width='200px' height='200px'></img> : <div></div>}
            </div>
            <div>
                {result? <div>{result}</div> : <div></div>}
            </div>
            <div>
                <label>
                    <br />
                    <img className='main_comp blur_darm robot_dance' style={{display:`${image? 'none' : null}`}} src={assistant} alt='imageUploadButton'></img>
                    <input style={{display:'none'}} type='file' accept="image/*" ref={fileRef} name="profile_img" id="file" onChange={changeImage}></input>
                </label>
                {/* <input type='file' accept="image/*" ref={fileRef} name="profile_img" id="file" onChange={changeImage}></input> */}
            </div>
            <br />
            {image ? <button onClick={predict}>예측</button> : <button disabled>예측</button>}

            <br />
            <br />
            <br />
            
            <div className="grayfont footfoot">* '랜드마크 닮은꼴 찾기'에 사용된 이미지 파일은 '스탬퍼' 서비스 저장소에 별도로 저장되지 않습니다. *</div>

        </Fragment>

    )
}

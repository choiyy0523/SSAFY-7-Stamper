import { Fragment, useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

export default function ImageTest() {
    const [district, setDistrict] = useState('default');
    const [image, setImage] = useState(null);
    const [url, setURL] = useState('');
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [predictionArr,setPredictionArr]=useState([]);
    const [result,setResult]=useState(null);
    const fileRef = useRef();

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

    return (
        <Fragment>
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
                <input type='file' accept="image/*" ref={fileRef} name="profile_img" id="file" onChange={changeImage}></input>
            </div>
            <button onClick={predict}>예측</button>
        </Fragment>

    )
}

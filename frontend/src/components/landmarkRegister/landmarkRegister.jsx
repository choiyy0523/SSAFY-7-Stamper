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
                        '?????????':'Xv6R4lzoj', 
                        '?????????':'IUV1IAdyW', 
                        '?????????':'TLvH5uNNR', 
                        '?????????':'P96Nksg3F', 
                        '?????????':'Ak_ufKSa3', 
                        '?????????':'BHBoxcBC5', 
                        '?????????':'UCsiDpz1Y', 
                        '?????????':'1rLl9t7Gm', 
                        '?????????':'pHeh9Am42', 
                        '?????????':'Rcqrvtk4W',
                        '????????????':'Xsnd-a9AT',
                        '?????????':'oKP1WTd5R',
                        '?????????':'DW5OcMjLD', 
                        '????????????':'0XkmIdOS6',
                        '?????????':'ug9V1Jxw-',
                        '?????????':'kncHgEjTR',
                        '?????????':'XhtA3LDT6',
                        '?????????':'81n5pSJwq',
                        '?????????':'AYqPL8Ep6',
                        '????????????':'N2UXqj3Yg',
                        '?????????':'8Ar0wuZ0n', 
                        '?????????':'z14z0WGp3',
                        '?????????':'wR4Iolw-n',
                        '??????':'9JVSZ0SaY',
                        '?????????':'3g1zdwWqe'}


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

        console.log('???: ', prediction[0].className + prediction[0].probability.toFixed(2));
        console.log('???: ', prediction[1].className + prediction[1].probability.toFixed(2));
        console.log('???: ', prediction[2].className + prediction[2].probability.toFixed(2));
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
            <h1>???????????? ??????</h1>
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
            <Button color="secondary" onClick={predict}>??????</Button>
            <div>
                <img style={{height:'100px', width:'100px', margin:'30px' }} src={aiIcon}></img>
                {locationApproved === true ? <img style={{height:'100px', width:'100px', margin:'30px'}} src={approved}></img> : <img className='basic' style={{ margin:'30px', height:'100px', width:'100px'}} src={location}></img>}
                <br />
                <span className='grayfont'>
                * ?????? ????????? ??????, ?????????, ???????????????, ????????????, ????????? ????????? ?????? ????????? ???????????? ??? ????????????. *
                </span>
                <br />
                <br />
                <span className='grayfont'>
                * ???????????? ????????? ???????????? ????????? ????????? '?????????' ????????? ???????????? ????????? ???????????????
                <br />
                ????????????, ?????????, ?????? ?????? ?????? ????????? ????????? ????????? ????????? ????????? ????????????. *
                </span>
            </div>
        </div>

    )
}

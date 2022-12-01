import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getAchieveList } from "../../api/achieve"
import "./userProfile.css"

import goldcrown from "../../../src/assets/achieve/gold_crown.png";
import silvercrown from "../../../src/assets/achieve/silver_crown.png";
import bronzecrown from "../../../src/assets/achieve/bronze_crown.png";


export default function achievedList() {
  const [achieveList, setAchieveList] = useState([]);
  const userInfo = useSelector((state) => state.UserInfo);


  const userSeq = userInfo.userInfo.userSeq;
  const token = userInfo.accessToken;

  useEffect(() => {
    getAchieveList(userSeq, token, (response)=>{
        console.log(response.data.achieveList);
        setAchieveList(response.data.achieveList);
    }, (error)=>{
        console.log(error);
    })

},[])
  return(
    <div className="map_center">
    <table className="list_left2 list_border2 tablewidth" style={{borderCollapse:'collapse'}}>
        <thead>
            <tr className="under_border2" style={{borderBottom:'3px solid white'}}>
                <th className="">업적</th>
                <th className="list_right2">달성일</th>
                <th className="">뱃지</th>
            </tr>
        </thead>
        <tbody>
            {achieveList.map((data)=>{
                return (
                    <tr>
                    <td className="list_left2"> {data.achieve.achieveName}</td>
                    <td className="list_border2"> { data.userAchievementTime.substr(0,10)}</td>
                    <td className="list_right2"> 

                    { data.achieve.achieveSeq % 3 === 0 ? <img style={{height:'13px', width:'20px'}} src={goldcrown} alt="마스터"></img> : <div></div> }
                    { data.achieve.achieveSeq % 3 === 2 ? <img style={{height:'13px', width:'20px'}} src={silvercrown} alt="여행자"></img> : <div></div> }
                    { data.achieve.achieveSeq % 3 === 1 ? <img style={{height:'13px', width:'20px'}} src={bronzecrown} alt="초심자"></img> : <div></div> }

                    </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>

  )
};
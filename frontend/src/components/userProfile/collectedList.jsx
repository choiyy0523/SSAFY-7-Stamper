import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getAllBookDetail } from "../../api/book"

export default function collectedList() {
    const [imageList, setImageList] = useState([]);
    const userInfo = useSelector((state) => state.UserInfo);
    const userSeq = userInfo.userInfo.userSeq;
    const token = userInfo.accessToken;

    useEffect(()=>{
        getAllBookDetail(userSeq, token, (response) => {
            setImageList(response.data.collectedBookList)
            console.log(imageList)
        })
    }, [])

    return (
        <div>
            {imageList.map((item)=>{
                return(
                    <img key={item.userbookCollectionSeq} style={{height:'100px', width:'100px'}} src={item.userbookCollectionImage}></img>
                );
            })};
        </div>
    )
};
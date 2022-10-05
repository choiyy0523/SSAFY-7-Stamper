import { useParams } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getBookDetail } from '../../api/book';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommentList } from '../../api/comment';

export default function landmark() {
    const landmarkNo = useParams().landmarkNo;
    // console.log(landmarkNo['landmarkNo'])

    const [imageURL, setImageURL] = useState("");
    const [landmarkName, setLandmarkName] = useState("");
    const [landmarkDesc, setLandmarkDesc] = useState("");
    const [landmarkComment, setLandmarkComment] = useState([]);

    const baseURL = "https://stamperimage.s3.ap-northeast-2.amazonaws.com/defaultimg/";

    // const queryClient = useQueryClient()
    // const query = useQuery()

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
            if (data.userBook) {
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
    

    return (
    <div>
            <div>{landmarkName}</div>
        <div>
            <img src={imageURL} alt={landmarkName}></img>
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
                <img src='../../src/assets/LOGO2.png' alt="LOGO2" width="30" height="30"></img>
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
    )
}
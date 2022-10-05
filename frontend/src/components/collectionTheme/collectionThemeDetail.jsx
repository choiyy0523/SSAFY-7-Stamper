import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListByCategory } from '../../api/book';

const collectionThemeDetail = (() => {

    const [bookList, setBookList] = useState([]);
    const [userBookList, setUserBookList] = useState([]);
    const [userBookSeqList, setUserBookSeqList] = useState([]);

    const themeName = useParams().themeName;

    const userInfo = useSelector((state) => state.UserInfo);

    const userSeq = userInfo.userInfo.userSeq;
    const userName = userInfo.userInfo.userName;
    const Token = userInfo.Token;

    useEffect(() => {
        console.log("userSeq : " + userSeq);
        console.log("themeName : " + themeName);
        
        getListByCategory(userSeq, themeName, '123', (response) => {
            let data = response.data;
            console.log(data);
            setUserBookList(data.collectedBookList);

            let temp = [];
            userBookList.forEach(element => {
                console.log(element);
                temp.push(element.book.bookSeq);
            });

            console.log(temp);

            setUserBookSeqList(temp);
            setBookList(data.totalBookList);
        }, (error) => {
            console.log(error)
        }
    ) 
    }, [])




    return (
        <div>
            collectionThemeDetail
            <br/>
            {userSeq} : {userName}
            <br/>
            themeName : {themeName}
            <br />
            <table>

                <thead>

            <tr>
                <th>도감번호</th>
                <th>지역</th>
                        <th>이름</th>
                        <th>수집여부</th>
                {/* <th>설명</th> */}
            </tr>
                </thead>
                <tbody>

            {bookList.map(item => {
                return (
                <tr>
                    <td>{item.bookSeq}</td>
                    <td>{item.bookGugun}</td>
                        <td>{item.bookName}</td>
                        {userBookSeqList.includes(item.bookSeq) ? <td>수집완료</td> : <td>미수집</td>}
                    {/* <td>{item.bookDescription}</td> */}
                </tr>
                )
            })}
                </tbody>
            </table>
        </div>
    )
})

export default collectionThemeDetail
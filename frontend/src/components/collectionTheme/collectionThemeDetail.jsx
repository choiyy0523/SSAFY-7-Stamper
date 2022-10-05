import { response } from 'express';
// import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListByCategory } from '../../api/book';

const collectionThemeDetail = (() => {

    const [bookList, setBookList] = useState([]);
    const [userBookList, setUserBookList] = useState([]);

    const themeNo = useParams().themeNo;

    const userInfo = useSelector((state) => state.UserInfo);

    const userSeq = userInfo.userInfo.userSeq;
    const userName = userInfo.userInfo.userName;
    const Token = userInfo.Token;

    // useEffect(() => {
    //     console.log(userSeq);
    //     console.log(themeNo);
        
    //     getListByCategory(userSeq, themeNo, '123', (response) => {
    //         let data = response.data;
    //         console.log(data);
    //     }, (error) => {
    //         console.log(error)
    //     }
    // ) 
    // }, [])




    return (
        <div>
            collectionThemeDetail
            <br/>
            {userSeq} : {userName}
            <br/>
            themeNo : {themeNo}
        </div>
    )
})

export default collectionThemeDetail
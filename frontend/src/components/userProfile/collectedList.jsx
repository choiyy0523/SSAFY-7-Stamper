import { Box, Grid } from "@material-ui/core";
import { border } from "@mui/system";
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
        <Box>
            <Grid container>
                {imageList.map((data)=>{
                    return(
                        <Grid item xs={4}>
                            <img key={data.userbookCollectionSeq} style={{height:'8em', width:'8em'}} src={data.userbookCollectionImage}></img>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
};
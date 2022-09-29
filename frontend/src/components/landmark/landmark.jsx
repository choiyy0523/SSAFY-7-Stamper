import { useParams } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function landmark() {
    const landmarkNo = useParams();
    console.log(landmarkNo['landmarkNo'])

    // const queryClient = useQueryClient()
    // const query = useQuery()
    

    return (
    <div>
        <div>landmarkName</div>
        <div>
            <img src='src\assets\approved.png' alt=''></img>
        </div>
        <div>
            <p>대충 설명</p>
        </div>
        <button>수집</button>
        <div>
            <TextField></TextField>
            <button>등록</button>
        </div>
        <div>
            <aside>
                <img src='src\assets\LOGO2.png'></img>
            </aside>
            <div>댓글제목</div>
            <div>댓글내용</div>
        </div>
        <button>더보기</button>
    </div>
    )
}
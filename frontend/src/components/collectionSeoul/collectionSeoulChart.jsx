import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export default function seoulChart() {

    const data = {
        labels: [
            '강남구', '강동구', '강북구', '강서구', '관악구', 
            '광진구', '구로구', '금천구', '노원구', '도봉구', 
            '동대문구', '동작구', '마포구', '서대문구', '서초구',
            '성동구', '성북구', '송파구', '양천구', '영등포구',
            '용산구', '은평구', '종로구', '중구', '중랑구'],
        datasets: [
            {
            data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            borderColor: "#000000",
            backgroundColor: '#FFFFFFF'
            }

        ]
    }

    return (    
            <Bar data={data}></Bar>
    )
}
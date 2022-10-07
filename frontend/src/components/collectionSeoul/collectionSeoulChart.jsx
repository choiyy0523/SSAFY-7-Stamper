import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { getCountOfGugun } from "../../api/book";
import { useSelector } from "react-redux";

export default function seoulChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [fordata, setFordata] = useState([]);

  const userInfo = useSelector((state) => state.UserInfo);
  const userSeq = userInfo.userInfo.userSeq;
  const token = userInfo.accessToken;

  const data = {
    labels: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    datasets: [
      {
        data: fordata,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "#060B47");
          gradient.addColorStop(1, "#BF60FF");
          return gradient;
        },
        borderColor: "#FFFFFFF",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
        width: 10,
        borderRadius: 7,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "BMJua",
          },
        },
      },
      title: {
        display: false,
        text: "",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        max: 16,
        ticks: {
          font: {
            family: "BMJua",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "BMJua",
          },
        },
      },
    },
  };

  useEffect(() => {
    getCountOfGugun(userSeq, token, (response)=>{
      console.log(response.data.gc)
      let tmp = [];
      for (var i = 0; i < 25; i++) {
        tmp[i] = response.data.gc[i].count;
      }
      setFordata(tmp);
      console.log("count data: ", tmp);
    }, (error)=>{
      console.log(error)
  })
  }, []);
  return <Bar data={data} options={options} height={"200%"}></Bar>;
}

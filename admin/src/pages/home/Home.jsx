import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import axios from "axios"
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const months = useMemo(()=>
   [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ],
  []
  )

  const [userStats, setUserStats] = useState([]);

  useEffect(()=>{
    const getStats = async ()=>{
      try{
      const res = await axios.get("/users/stats", {headers:{
        token:
        "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    const statsList = res.data.sort(function (a, b){
      return a._id - b._id;
    });
    
    statsList.map(item=> setUserStats(prev=>[...prev,{name:months[item._id-1], "New User": item.total},]));
  }catch(err){
    console.log(err);
  }
  };
  getStats();
  },[months]);


  return (
    <div className="home">
      <Chart data={userStats} title="Phân tích người dùng" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
      </div>
    </div>
  );
}

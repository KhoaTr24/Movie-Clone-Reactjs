import Navbar from "../../components/navbar/Navbar";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, DeleteForeverRounded, PlayArrow } from "@material-ui/icons"
import "./history.scss";
import Footer from "../footer/Footer";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";



const History = (index) => {
  const [isHovered, setIsHovered] = useState(false);
  const [histories, setHistories] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  useEffect(()=> {
    const getHistoryItem = async ()=>{
      try{
        const res = await axios.get(
          "/histories" ,
          {
            headers:{
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setHistories(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getHistoryItem();
  },[]);
  console.log(histories.filter(histories=>histories.userid.includes("637f186175f399b4689c8d06")));
  return(
    <div className="home">
      <Navbar />
      <Search/>
      <br></br>
      <br></br>
      <br></br>
      
      <div className="list" >
      
      <span className="listTitle">{histories.title}</span>
      <br></br>
        <br></br>
        <br></br>
        <br></br>
      <div className="wrapper">  
      <h1>Lịch sử đã xem</h1> 
        <ArrowBackIosOutlined className="sliderArrow left" onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} />
        <div className="container" ref={listRef}>
        
          {histories.filter(histories=>histories.userid.includes(`${JSON.parse(localStorage.getItem("user"))._id}`)).map((histories) =>(< div   >
          <div
        className="listItem"
        style={{ left: isHovered && index * 250  + index }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={histories?.img} alt="" />
        {isHovered && (
          <>
            <div className="itemInfo">
              <div className="icons">
              <Link to = {{pathname: "/watch/" +histories._id, movie:histories}}>
                <PlayArrow className="icon" />
              </Link>
                <DeleteForeverRounded className="icon" onClick={()=>window.location.reload(true)(axios.delete("/histories/"+histories._id,{
                  headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  }))
                  }/>
                  {histories.title}
              </div>
              <div className="itemInfoTop">
                <span>{histories.duration}</span>
                <span className="limit">+{histories.limit}</span>
                <span>Year: {histories.year}</span>
              </div>
              <div className="desc">Mô tả: {histories.desc}</div>
              <div className="genre">Thể loại: {histories.genre}</div>
            </div>
            
          </>
        )}
        </div>  
          </div>))
          }
        </div>
        <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick("right")} />
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default History;
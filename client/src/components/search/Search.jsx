import { ArrowBackIosOutlined, ArrowForwardIosOutlined, PlayArrow } from "@material-ui/icons"
import "./search.scss";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Search = (index) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [search, setSearch] = useState([]);
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
    const getSearchItem = async ()=>{
      try{
        const res = await axios.get(
          "/movies" ,
          {
            headers:{
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setTrailers(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getSearchItem();
  },[]);

  console.log(search);

  return(
    <div className="home">
      <br></br>
      <div className="searchitem">
        <div className="inputSearch">  
      <input type="text" placeholder=" Tìm kiếm..." id="inputsearch" onChange={(e)=>setSearch(e.target.value)}></input>
      <div className="list" >
      <span className="listTitle">{trailers.title}</span>
      <div className="wrapper">   
        <ArrowBackIosOutlined className="sliderArrow left" onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} />
        <div className="container" ref={listRef}>
          {trailers.filter(trailers=>trailers.title.toLowerCase().includes(search)).map((trailers) =>(< div   >
          <div
        className="listItem"
        style={{ left: isHovered && index * 250  + index }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      > 
      <img src={trailers?.img} alt="" />
        {isHovered && (
          <>
            <div className="itemInfo">
            
              <div className="icons">
              <Link to = {{pathname: "/watch/" +trailers._id, movie:trailers}}>
                <PlayArrow className="icon" />
              </Link>
              <span>{trailers.title}</span>
              </div>
              <div className="itemInfoTop">
                <span>{trailers.duration}</span>
                <span className="limit">+{trailers.limit}</span>
                <span>Year: {trailers.year}</span>
              </div>
              <div className="desc">Mô tả: {trailers.desc}</div>
              <div className="genre">Thể loại: {trailers.genre}</div>
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
    </div>
    </div>
    </div>
  );
};

export default Search;
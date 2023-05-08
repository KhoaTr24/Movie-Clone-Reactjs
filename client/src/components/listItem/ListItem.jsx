import "./listItem.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PlayArrow,
} from "@material-ui/icons";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" +item, {
          headers: {
            token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,},}); 
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  console.log(item);

  return (
    
      <div
        className="listItem"
        style={{ left: isHovered && index * 250  + index }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} controls loop ></video>
            
            <div className="itemInfo">
              <div className="icons">
              <Link to={{ pathname: "/watch/"+movie._id, movie: movie }}>
                <PlayArrow className="icon" />
              </Link>
              {movie.title}
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>Year: {movie.year}</span>
              </div>
              <div className="desc">Mô tả: {movie.desc}</div>
              <div className="genre">Thể loại: {movie.genre}</div>
            </div>
          </>
        )}
      </div>
    
  );
}

import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation  } from "react-router-dom";
import "./watch.scss";
import axios from "axios"

export default function Watch() {
 
  const location = useLocation();
  console.log(location);
  const movie = location.movie;

  axios.post('/histories', {
    title: movie.title,
    desc:movie.desc,
    img:movie.img,
    trailer:movie.trailer,
    limit:movie.limit,
    year:movie.year,
    genre:movie.genre,
    userid: JSON.parse(localStorage.getItem("user"))._id
  },{
    headers: {
      token:
      "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
    }
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  const handlelink =() =>{
    window.window.open(movie.linkNetflix);
  };


  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="movie" autoPlay progress controls src={movie.trailer} />
      <div className='para'>
          <h1>Tên phim: {movie.title}</h1>
          <h3>Thể loại: {movie.genre}</h3>
          <h3>Độ tuổi:  {movie.limit}</h3>
          <h3>Nội dung: <br></br><p>- {movie.desc}</p></h3>
          <h3>Link xem full: <span onClick={handlelink}>Netflix</span> </h3>
        </div>
    </div>
  );
}
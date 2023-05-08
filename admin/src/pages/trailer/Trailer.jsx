import { Link, useHistory, useLocation } from "react-router-dom";
import "./trailer.css";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useContext, useState } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";

export default function Product() {
    const location = useLocation();
    const movie = location.movie;
    const [movies, setMovies] = useState(null);
    const {dispatch} = useContext(MovieContext);
    const history = useHistory();

    const handleChange = (e)=>{
        const value = e.target.value;
        setMovies({ ...movies, [e.target.name]: value});
      };

    const handleSubmit =(e) => {
        e.preventDefault();
        updateMovie(movies, dispatch);
        history.push("/movies")
      };
      

      console.log(movies);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">ID:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Age:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Name</label>
                  <input type="text" name="title" placeholder={movie.title} onChange={handleChange}/>
                  <label>Year</label>
                  <input type="text" name="year" placeholder={movie.year} onChange={handleChange}/>
                  <label>Genre</label>
                  <input type="text" name="genre" placeholder={movie.genre} onChange={handleChange}/>
                  <label>Age</label>
                  <input type="text" name="limit" placeholder={movie.limit} onChange={handleChange}/>
                  {/* <label>Trailer</label>
                  <input type="file" name="title" placeholder={movie.trailer} onChange={handleChange}/>
                  <label>Movie</label>
                  <input type="file" name="title" placeholder={movie.movie} onChange={handleChange}/> */}
              </div>
              <div className="productFormRight">
                  {/* <div className="productUpload">
                      <img 
                        src={movie.img} 
                        alt=""
                        className="productUploadImg"
                      />

                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div> */}
                  <button className="productButton" onClick={(handleSubmit)}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

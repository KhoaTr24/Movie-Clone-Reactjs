import { useContext, useState } from "react";
import "./newTrailer.css";
import storage from "../../firebasestorage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const [movies, setMovies] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setTitleImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const {dispatch} = useContext(MovieContext)
  const history = useHistory();

  const handleChange = (e)=>{
    const value = e.target.value;
    setMovies({ ...movies, [e.target.name]: value});
  };

  const upload = (item)=>{
    item.forEach((item)=>{
      //const fileName= new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/movies/${item.file.name}`).put(item.file);
      uploadTask.on("state_changed", snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Đang upload " + progress + "% done");
      },
      (err)=>{console.log(err);
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
          setMovies((prev)=>{return{...prev,[item.label]: url};
          });
          setUploaded((prev)=> prev + 1);
        });
      }
      );
    });
  };

  const handleUpload = (e)=>{
    e.preventDefault();
    upload([
      {file:img, label: "img"},
      {file:imgTitle, label: "imgTitle"},
      {file:imgSm, label: "imgSm"},
      {file:trailer, label: "trailer"},
      {file:movie, label: "movie"},
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movies,dispatch)
    history.push("/movies")
  }

  console.log(movies);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm phim mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Hình</label>
          <input type="file" id="img" name="img" onChange={(e)=>setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={(e)=>setTitleImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={(e)=>setImgSm(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Movie Name</label>
          <input type="text" placeholder="Spider-man..." name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Mô tả</label>
          <input type="text" placeholder="Đây là bộ phim..." name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="number" placeholder="Năm xuất bản" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Thể loại</label>
          <input type="text" placeholder="Hành động..." name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Độ dài</label>
          <input type="text" placeholder="Độ dài phim." name="duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Độ tuổi</label>
          <input type="number" placeholder="16+..." name="limit" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={(e)=>setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Movie</label>
          <input type="file" name="movie" onChange={(e)=>setMovie(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Link xem full netflix</label>
          <input type="text" name="linkNetflix" onChange={handleChange}/>
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}

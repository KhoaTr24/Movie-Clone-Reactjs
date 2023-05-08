import { useContext, useState } from "react";
import "./newList.css";
import { getMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect } from "react";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [lists, setLists] = useState(null);
  const history = useHistory();

  const {dispatch} = useContext(ListContext)
  const {movies, dispatch: dispatchMovie} = useContext(MovieContext)

  useEffect(()=>{
    getMovies(dispatchMovie);
  },[dispatchMovie])

  const handleChange = (e)=>{
    const value = e.target.value;
    setLists({ ...lists, [e.target.name]: value});
  };

  const handleSelect = (e)=>{
    let value = Array.from(e.target.selectedOptions, (option)=> option.value);
    setLists({ ...lists, [e.target.name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(lists, dispatch);
    history.push("/lists")
  }



  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm List</h1>
      <form className="addProductForm">
        <div className="formLeft">


        
        <div className="addProductItem">
          <label>List Name</label>
          <input type="text" placeholder="Kinh Dị..." name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Thể loại</label>
          <input type="text" placeholder="Hành động..." name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Loại Phim</label>
          <select name="type" id="type" onChange={handleChange}>
          <option >---Loại phim---</option>
            <option value="movies">Phim lẻ</option>
          </select>
        </div>
        </div>
        <div className="formRight">
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" id="content" onChange={handleSelect} style={{height:"282,5px"}}>
            {movies.map((movie)=>(
              <option key={movie._id} value={movie._id}>{movie.title}</option>    
            ))}       
          </select>
        </div>
        </div>
          <button className="addProductButton" onClick={handleSubmit}>Tạo</button>
      </form>
      </div>
  );
}

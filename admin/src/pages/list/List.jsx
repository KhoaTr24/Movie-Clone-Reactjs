import { useHistory, useLocation } from "react-router-dom";
import "./list.css";
import { updateList } from "../../context/listContext/apiCalls";
import { useContext, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";

export default function List() {
    const location = useLocation();
    const history = useHistory();
    const [lists, setLists] = useState(null);
    const list = location.list;
    const {dispatch} = useContext(ListContext)

    const handleChange = (e)=>{
        const value = e.target.value;
        setLists({ ...lists, [e.target.name]: value});
      };
      console.log(handleChange);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateList(lists, dispatch);
        history.push("/lists")
      }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Danh Mục</h1>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">ID:</span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                      <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List Name</label>
                  <input type="text" name="title" placeholder={list.title} onChange={handleChange}/>
                  <label>Type</label>
                  <input type="text" name="type" placeholder={list.type} onChange={handleChange}/>
                  <label>Genre</label>
                  <input type="text" name="genre" placeholder={list.genre} onChange={handleChange}/>
              </div>
              <div className="productFormRight">
                  
                  <button className="productButton" onClick={handleSubmit}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

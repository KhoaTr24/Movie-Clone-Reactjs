import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";
import axios from "axios";

export default function Featured({type, setGenre}) {
  const [content,setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async()=>{
      try{
        const res = await axios.get(`/movies`, {
          headers:{
            token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err)
      }
    };
    getRandomContent();
  },[type]);
  console.log(content)
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Trailer" : "Đã xem"}</span>
          <select name="genre" id="genre" onChange={(e)=>setGenre(e.target.value)}>
            <option>Thể loại</option>
            <option value="Phiêu lưu">Phiêu lưu</option>
            <option value="Hành động">Hành động</option>
            <option value="Tội phạm">Tội phạm</option>
            <option value="Viễn tưởng">Viễn tưởng</option>
            <option value="Kinh dị">Kinh dị</option>
            <option value="Hoạt hình">Hoạt hình</option>
          </select>
        </div>
      )}

        <img src={content.imgTitle} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt=""  />
        <span className="title">Tên phim: {content.title}</span>
        <span className="desc">Mô tả: {content.desc}</span>
        <div className="buttons">
          <Link to = {{pathname: "/watch/" +content._id, movie:content}}>
          <button className="play">
            <PlayArrow/>
            <span>Phát</span>
          </button>
          </Link>
          <button className="more">
            <InfoOutlined/>
            <span>Thông tin</span>
          </button>
        </div>
      </div>
    </div>
  )
}

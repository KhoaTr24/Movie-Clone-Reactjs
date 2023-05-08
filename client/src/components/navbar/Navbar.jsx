import { ArrowDropDown } from "@material-ui/icons"
import { useState } from "react"
import { Link} from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import {useContext} from "react";
import "./navbar.scss"

  const Navbar = () => {
  // Hiệu ứng cuộn thanh navbar
  const [isScrolled, setIsScrolled] = useState(false);
  const {dispatch} = useContext(AuthContext);

  window.onscroll = () =>{
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // Xây dựng khung
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="https://haycafe.vn/wp-content/uploads/2022/04/Anh-phi-hanh-gia-an-bap-rang-bo.png" alt="" />
          <Link to="/" className="link">
          <span>Trang chủ</span>
          </Link>
          <Link to={{pathname:"/movies"}} className="link">
          <span className="navbarmainLinks">Trailer</span>
          </Link>
          <Link to="/histories" className="link">
          <span className="navbarmainLinks">Lịch sử đã xem</span>
          </Link>
          <a href="http://localhost:3001/"><span>TMDB</span></a>
        </div>
        <div className="right">
          
        {/* <div class="group">
          <Search className="icon"/>
          <input type="search" placeholder="Tìm kiếm" className="input" />
        </div>  */}
          <div className="profile">
            <span>Xin chào, {JSON.parse(localStorage.getItem("user")).username}</span>
          <img src="https://png.pngtree.com/png-vector/20190525/ourlarge/pngtree-man-avatar-icon-professional-man-character-png-image_1055448.jpg" alt="" />
            <ArrowDropDown className="icon"/>
            <div className="options">
              <Link to = {{pathname: "/login"}}>
              <span onClick={()=>dispatch(logout())}>Thoát</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

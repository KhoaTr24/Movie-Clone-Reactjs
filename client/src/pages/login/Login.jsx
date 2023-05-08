import { Link } from "react-router-dom";
import {useState, useContext} from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import {message} from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext);

  const handleLogin = (e)=>{
    e.preventDefault()
    login({email,password}, dispatch)
    setTimeout(()=>{
      message.success('Đăng nhập thành công')
    },1000)
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://haycafe.vn/wp-content/uploads/2022/04/Anh-phi-hanh-gia-an-bap-rang-bo.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Đăng nhập</h1>
          <input type="email" placeholder="Email hoặc Số điện thoại" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
          <button className="loginButton" onClick={handleLogin}>Đăng nhập</button>
          <span>
            Chưa có tài khoản ? <Link to = {{pathname:"/register"}}><b>Đăng kí ngay</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}

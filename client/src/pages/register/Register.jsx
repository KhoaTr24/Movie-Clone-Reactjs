import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { message } from "antd";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();


  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    try{
    setUsername(usernameRef.current.value);
    setPassword(passwordRef.current.value);
    await axios.post("auth/register", {email,username,password});
    history.push("/login");
    }catch(err){
    }
    setTimeout(()=>{
      message.success('Đăng ký thành công')
    }, 1000)
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://haycafe.vn/wp-content/uploads/2022/04/Anh-phi-hanh-gia-an-bap-rang-bo.png"
            alt=""
          />
          <Link to = {{pathname:"/login"}}>
          <button className="loginButton">Đăng nhập</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Xin chào bạn đến với chúng tôi</h1>
        <h2>Xem mọi lúc, mọi nơi</h2>
        <p>
          Nhập email của bạn để đăng kí trở thành thành viên của chúng tôi !
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder=" Nhập Email" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Tiếp theo
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="Nhập tên" ref={usernameRef} />
            <input type="password" placeholder="Nhập mật khẩu" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Đăng kí
            </button>
          </form>
        ) 
        }
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import "./newUser.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { createUser } from "../../context/userContext/apiCalls";

export default function NewUser() {
  const [users, setUser] = useState(null);


  const {dispatch} = useContext(UserContext)
  const history = useHistory();

  const handleChange = (e)=>{
    const value = e.target.value;
    setUser({ ...users, [e.target.name]: value});
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(users,dispatch)
    history.push("/users")
  }

  console.log(users);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm User</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>User Name</label>
          <input type="text" placeholder="Khoa" name="username" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Email</label>
          <input type="text" placeholder="khoat@gmail.com" name="email" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Admin</label>
          <select name="isAdmin" id="isAdmin" onChange={handleChange}>
            <option value="false">Không</option>
            <option value="true">Có</option>         
          </select>
        </div>
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

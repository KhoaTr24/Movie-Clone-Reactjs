import { Link, useHistory, useLocation } from "react-router-dom";
import "./user.css";
import { updateUser } from "../../context/userContext/apiCalls";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";

export default function User() {
    const location = useLocation();
    const user = location.user;
    const [users, setUsers] = useState(null);
    const {dispatch} = useContext(UserContext);
    const history = useHistory();

    const handleChange = (e)=>{
        const value = e.target.value;
        setUsers({ ...users, [e.target.name]: value});
      };
      console.log(handleChange);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(users, dispatch);
        history.push("/users")
      }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">User</h1>
        <Link to="/newUser">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">ID:</span>
                      <span className="productInfoValue">{user._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Email:</span>
                      <span className="productInfoValue">{user.email}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Username:</span>
                      <span className="productInfoValue">{user.username}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Password:</span>
                      <span className="productInfoValue">{user.password}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>User Name</label>
                  <input type="text" placeholder={user.username} name="username" onChange={handleChange}/>
                  <label>Email</label>
                  <input type="text" placeholder={user.email} name="email"onChange={handleChange}/>
              </div>
              <div className="productFormRight">
                  <button className="productButton" onClick={handleSubmit}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

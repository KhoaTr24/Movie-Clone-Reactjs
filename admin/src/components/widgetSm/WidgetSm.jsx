import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])


  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2YxODYxNzVmMzk5YjQ2ODljOGQwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTM5MjgzNCwiZXhwIjoxNjY5ODI0ODM0fQ.M6odMrAIjJWbRpQUXn5_fgm1U2i9lobHvlZONcFO9E4",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user=>(
        <li className="widgetSmListItem">
          <img
            src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Người Dùng: {user.username}</span>
          </div>

          <Link to = {{pathname : "/users/"}}>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
          </Link>   
        </li>
        ))}   
      </ul>
    </div>
  );
}

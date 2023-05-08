import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  List,
  PlayArrow,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
          
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayArrow className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to ="/lists" className="link">
            <li className="sidebarListItem">
              <List className="sidebarIcon" />
              Danh mục
            </li>
            </Link>
          </ul>
        </div>
 
      </div>
    </div>
  );
}

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/trailerList/TrailerList";
import Product from "./pages/trailer/Trailer";
import NewProduct from "./pages/newTrailer/NewTrailer";
import { AuthContext } from "./context/authContext/AuthContext";
import Login from "./pages/login/Login";
import {useContext} from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
      <Route path="/login">
          {user ? <Redirect to = "/users"/> :
            <Login />
          }
          </Route>
          {user &&
          <>
      <Topbar />
      <div className="container">
        <Sidebar /> 
      
 
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>  
          <Route path="/lists">
            <ListList />
          </Route>
          <Route path="/list/:listId">
            <List />
          </Route>
          <Route path="/newList">
            <NewList />
          </Route>  
      </div></>
      }
      </Switch>
    </Router>
  );
}

export default App;

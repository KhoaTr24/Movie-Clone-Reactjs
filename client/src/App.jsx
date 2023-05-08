
import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import History from "./pages/history/History";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "./authContext/AuthContext"





const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Redirect to="/registe" />}
      </Route>
      <Route path="/register">
        {!user ? <Register /> : <Redirect to="/" />}
      </Route>
      <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
      {user && (
        <>
          <Route path="/movies">
            <Home type="movies" />
          </Route>
          <Route path="/histories">
            <History />
          </Route>
          <Route path="/watch">
            <Watch />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </>
      )}
    </Switch>
  </Router>
  );
};

export default App;

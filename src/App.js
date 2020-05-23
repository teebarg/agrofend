import React from "react";
import "./App.css";
import Home from "./pages/home/home";
import login from "./pages/login/login";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import NotFound from "./pages/not-found/404";
import AdminModule from "./modules/admin/admin"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <div className={"app"}>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/admin">
            <AdminModule />
          </PrivateRoute>
          <Route path="/login" component={login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      !!Cookies.get('agro_cookie') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default App;

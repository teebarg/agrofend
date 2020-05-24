import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { BrowserRouter as Router, Route, Switch, NavLink  } from "react-router-dom";
import MarketListing from "../../pages/market-listing/market-listing";
import MarketView from "../../pages/view-market/view-market";
import MarketCreate from "../../pages/create-market/create-market";
import Button from "react-bootstrap/Button";
import Dashboard from "../../pages/dashboard/dashboard";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./admin.css";

const AdminModule = () => {
  const libraries = ["places"];
  const [show, setShow] = useState(false);

  let history = useHistory();
  useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const logout = () => {
    Cookies.remove("agro_cookie");
    history.push("/");
  };

  const handleSidebar = () => {
    setShow(!show);
  };

  const routes = [
    {
      path: "/admin/dashboard",
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <Dashboard />,
    },
    {
      path: "/admin/create-market",
      sidebar: () => <div>bubblegum!</div>,
      main: () => <MarketCreate />,
    },
    {
      path: "/admin/listing",
      sidebar: () => <div>shoelaces!</div>,
      main: () => <MarketListing />,
    },
    {
      path: "/admin/market/:id",
      sidebar: () => <div>Market View</div>,
      main: () => <MarketView />,
    },
  ];

  return (
    <Router>
      <div className="admin_container">
        <div className={"sidebar " + (show ? "active" : "")}>
          <button onClick={handleSidebar} className={"btn show__btn"}>
            {" "}
            <img src={show ? "/close.svg" : "/open.svg"} alt="close" />{" "}
          </button>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink onClick={() => setShow(false)}  to="/admin/dashboard" activeClassName="selected">Home</NavLink >
            </li>
            <li>
              <NavLink onClick={() => setShow(false)} to="/admin/create-market" activeClassName="selected">Create Market</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShow(false)}  to="/admin/listing" activeClassName="selected" >List Markets</NavLink >
            </li>
          </ul>
          <div
            style={{ bottom: 0, position: "absolute", paddingBottom: "10px" }}
          >
            <Button variant="primary" type="button" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>

        <div className="content">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default AdminModule;

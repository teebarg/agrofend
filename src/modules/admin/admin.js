import React from "react";
import {
  useLoadScript
} from "@react-google-maps/api";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MarketListing from "../../pages/market-listing/market-listing";
import MarketView from "../../pages/view-market/view-market";
import MarketCreate from "../../pages/create-market/create-market";
import Button from "react-bootstrap/Button";
import Dashboard from '../../pages/dashboard/dashboard';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AdminModule = () => {
  const libraries = ["places"];
  let history = useHistory();
  useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const logout = () => {
    Cookies.remove('agro_cookie')
    history.push("/")
  };

  const routes = [
    {
      path: "/admin",
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
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            padding: "10px",
            width: "15%",
            background: "#f0f0f0",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link to="/admin/create-market">Create Market</Link>
            </li>
            <li>
              <Link to="/admin/listing">List Markets</Link>
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

        <div style={{ flex: 1, padding: "0 10px", height: "inherit", overflowY: "auto" }}>
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

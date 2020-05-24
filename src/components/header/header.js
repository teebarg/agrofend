import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar
        style={{ height: "50px" }}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>
          <Link to={"/"} key={"home"}>
            <img src="/logo.png" alt="Market Hub" style={{width: "170px"}} />
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          {!!Cookies.get("agro_cookie") ? (
            <Link to={"/admin/dashboard"} key={"dashboard"} className={"nav-link"}>
              Dashboard
            </Link>
          ) : (
            <Link to={"/login"} key={"login"} className={"nav-link"}>
              Login
            </Link>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;

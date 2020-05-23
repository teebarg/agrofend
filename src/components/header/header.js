import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Cookies from 'js-cookie';
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
        <Navbar.Brand href="#home">Marketeer</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
          <Nav>
            {!!Cookies.get("agro_cookie") ? (
              <Link to={"/admin"} key={'dashboard'} className={"nav-link"}>Dashboard</Link>
            ) : (
                <Link to={"/login"} key={'login'} className={"nav-link"}>Login</Link>
            )}
          </Nav>
      </Navbar>
    </>
  );
};

export default Header;

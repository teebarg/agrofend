import React from "react";
import "./Loader.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Button variant="primary" size="sm" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  );
};

export default Loader;

import React from "react";
import Card from "react-bootstrap/Card";
import "./market.css";

const Market = ({ market }) => {
  return (
    <div className="market">
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <div className="image--container">
            {market && market.Images.map((item,key) => (<img key={key} src={ process.env.REACT_APP_IMAGE_URL + item.image} alt={item.image} />))}
          </div>
          <div className="details">
            <h6> <span>Name:</span> {market.name}</h6>
            <p> <span>Address:</span> {market.address}</p>
            <p> <span>Desc:</span> {market.description}</p>
            <p> <span>Lat:</span> {market.latitude}</p>
            <p> <span>Log:</span> {market.longitude}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Market;

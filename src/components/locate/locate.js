import React from "react";
import "./locate.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Click to see Markets Near You
    </Tooltip>
  );
}

const Locate = ({ panTo }) => {
  const btnRef = React.createRef()
  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <button
          ref={btnRef}
          className={"locate"}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => null
            );
          }}
        >
          <img src="/ipurush_Compass.svg" alt="compass" />
        </button>
      </OverlayTrigger>
    </>
  );
};
export default Locate;

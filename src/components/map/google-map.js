import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../../util/mapStyles";
import Market from "../market/market";
import { Utility } from "../../util/utility";

const Map = ({ markers, loc }) => {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      panTo(loc);
    }
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    try {
      mapRef.current = map;
    } catch (error) {
      Utility.showError(error)
    }
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={loc}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker, key) => (
          <Marker
            key={key}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={{
              url: "/logo2.png",
              scaledSize: new window.google.maps.Size(60, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(30, 15)
            }}
            onClick={() => {
              setSelected(marker);
            }}
          ></Marker>
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Market market={selected} />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

export default Map;

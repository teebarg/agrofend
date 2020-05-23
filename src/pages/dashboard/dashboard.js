import React, { useState, useEffect } from "react";
import Search from "../../components/search/search";
import Locate from "../../components/locate/locate";
import {HttpService} from "../../services/httpService";
import { useFormik } from "formik";
import Map from "../../components/map/google-map";
import swal from "sweetalert";

const Dashboard = () => {
    const [markers, setMarkers] = useState([]);
    const [loc, setLoc] = useState({
        lat: 6.5097218028679205,
        lng: 3.3661340416748287,
      });

    useEffect(() => {
        console.count(1)
      getMarkets()
    }, []);

    const formik = useFormik({
      initialValues: {
        address: "",
      },
    });


    const getMarkets = async () => {         
        try{
            const {data: {data}} = await HttpService.getMarkets();
            setMarkers(data.markets);
        } catch(err) {
            swal("Failed!", err.message || 'Please Contact Adminstrator', "error");
        }
    }

    const panTo = React.useCallback(({ lat, lng }) => {
      setLoc({ lat, lng });
    }, []);
    
    const container = {
      height: 'inherit',
      width: 'inherit',
    }

  return (
    <div style={container}>
        <div style={{position: 'absolute', width: '20vw', zIndex: 1, top: '5px'}}>
          <Search formik={formik} panTo={panTo} />
        </div>
        <Locate panTo={panTo} />
        {markers && <Map loc={loc} markers={markers} />}
    </div>
  );
};

export default Dashboard;

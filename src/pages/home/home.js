import Map from "../../components/map/google-map";
import React, { useState, useEffect } from "react";
import "./home.css";
import { HttpService } from "../../services/httpService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Locate from "../../components/locate/locate";
import Header from "../../components/header/header";
import { Utility } from "../../util/utility";
import swal from "sweetalert";

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loc, setLoc] = useState({
    lat: 6.5097218028679205,
    lng: 3.3661340416748287,
  });

  useEffect(() => {
    getCategories();
  }, []);


  const getCategories = async () => {
    try {
      const { data: { data } } = await HttpService.getCatefories();
      setCategories(data.categories);
    } catch (err) {
      Utility.showError(err);
    }
  };

  const panTo = (e) => {
    setLoc(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { search, categoryId } = e.target.elements;

    try {
      const {data: { data }} = await HttpService.getMarkets({
        name: search.value,
        categoryId: categoryId.value,
      });
      setMarkers(data.markets);
      if(data.markets.length) {
        const coor = {
          lat: data.markets[0].latitude,
          lng: data.markets[0].longitude,
        }
        setLoc(coor);
      } else {
        swal("Not Found!", "No Market Found, Try Again", "warning");
      }
    } catch (err) {
      Utility.showError(err)
    }
  };

  return (
    <>
      <Header />
      <div className={"home__wrapper"}>
        <div className={"search__container"}>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Control
              required
              type="text"
              name="search"
              placeholder="Enter Market Name"
              style={{ width: "60vw" }}
            />
            <div>
              <Form.Control name="categoryId" as="select" custom>
                <option value={null} label="Select a Category" />
                {categories &&
                  categories.map((item, key) => (
                    <option key={key} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Control>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </div>
          </Form>
        </div>
        <Map loc={loc} markers={markers} />
        <Locate panTo={panTo} />
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { HttpService } from "../../services/httpService";
import { Utility } from "../../util/utility";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const MarketListing = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    getMarkets();
    return () => (isSubscribed = false);
  }, []);

  const getMarkets = async () => {
    try {
      const {
        data: { data },
      } = await HttpService.getMarkets();
      setMarkets(data.markets);
    } catch (err) {
      Utility.showError(err);
    }
  };

  const handleDelete = async (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await HttpService.deleteMarket(e);
          swal("Market Successfully Deleted", {
            icon: "success",
          });
          const newArray = markets.filter(item => item.id !== e)
          setMarkets(newArray);
        } catch (err) {
          Utility.showError(err);
        }
      }
    });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market, key) => (
            <tr key={key}>
              <td>{++key}</td>
              <td>{market.name}</td>
              <td>{market.address}</td>
              <td>{market.latitude}</td>
              <td>{market.longitude}</td>
              <td>
                <Link to={"/admin/market/" + market.id}>Edit</Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(market.id)}
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MarketListing;

import React, { useState, useEffect } from "react";
import { HttpService } from "../../services/httpService";
import { Utility } from "../../util/utility";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ManageImage from "../../components/manage-image/manage-image";
import AddMarket from "../../components/add-market/add-market";
import {
  useParams,
} from "react-router-dom";
import "./view-market.css";
import swal from "sweetalert";

const MarketView = () => {
  const [market, setMarket] = useState(null);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);

  const handleModal = ({ mode, item, market }) =>
    setModal((prevState) => {
      setShow(true);
      return { ...prevState, mode, item, market };
    });

  let { id } = useParams();

  useEffect(() => {
    fetchMarket();
  }, []);

  const fetchMarket = async () => {
    try {
      const { data: { data } } = await HttpService.getMarket(id);
      setMarket(data);
    } catch (error) {
      Utility.showError(error);
    }
    setShow(false);
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
          await HttpService.deleteImage(e);
          fetchMarket();
          swal("Image Successfully Deleted", {
            icon: "success",
          });
        } catch (err) {
          Utility.showError(err);
        }
      }
    });
  };

  return (
    <>
      <div>
        <h3>View/Edit Market</h3>
        {market && <AddMarket data={{ mode: "edit", market: market }} />}
        <div className="image-listing">
          {market &&
            market.Images.map((item, key) => (
              <Card style={{ }} key={key}>
                <Card.Img
                  variant="top"
                  src={process.env.REACT_APP_IMAGE_URL + item.image}
                />
                <Card.Body>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleModal({ mode: "edit", item: item })}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          {market && market.Images.length < 3 && (
            <Button
              variant="primary"
              style={{ height: "35px", width: "fit-content" }}
              size="sm"
              onClick={() =>
                handleModal({ mode: "add", item: null, market: market.id })
              }
            >
              Add Image
            </Button>
          )}
        </div>
      </div>
      {show && (
        <ManageImage
          modal={modal}
          show={show}
          handleClose={() => fetchMarket()}
        />
      )}
    </>
  );
};

export default MarketView;

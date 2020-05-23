import React, { useState, useEffect } from "react";
import { HttpService } from "../../services/httpService";
import { Utility } from "../../util/utility";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ManageImage = ({ show, handleClose, modal: { mode, item, market } }) => {
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      const img = process.env.REACT_APP_IMAGE_URL + item.image;
      setImage(img);
    }
  }, []);

  const handleImage = async (e) => {
    try {
      const image = await Utility.getBase64(e.target.files[0]);
      setImage(image);
      setUploaded(true);
    } catch (error) {
      Utility.showError(error);
    }
  };

  const Upload = async () => {
    if (!uploaded) return alert("No Upload");
    setIsLoading(true);
    try {
      const marketId = market;
      if (mode === "edit") {
        await HttpService.editImage({ payload: image, id: item.id });
      } else {
        await HttpService.addImage({ image, marketId });
      }
      handleClose();
      setImage(null);
      setUploaded(false);
      setIsLoading(false);
    } catch (error) {
      Utility.showError(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "edit" ? "Update" : "Upload"} Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.File
              id="custom-file"
              onChange={handleImage}
              label="Image Upload"
              custom
            />
          </Form>
          {image && (
            <img
              src={image}
              alt="marketImage"
              style={{ maxWidth: "100%", marginTop: "5px", height: "200px" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          {!isloading ? (
            <Button variant="primary" size="sm" onClick={Upload}>
              {mode === "edit" ? "Update" : "Upload"}
            </Button>
          ) : (
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
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageImage;

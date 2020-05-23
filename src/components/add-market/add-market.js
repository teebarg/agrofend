import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Search from "../search/search";
import { HttpService } from "../../services/httpService";
import { Utility } from "../../util/utility";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useHistory } from 'react-router-dom';
import Loader from "../loader/Loader";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.categoryId) {
    errors.categoryId = "Required";
  }

  if (!values.address) {
    errors.address = "Required";
  }

  return errors;
};

const AddMarket = ({ data: { market, mode } }) => {
  const [geo, setGeo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const {data: {data}} = await HttpService.getCatefories();
      setCategories(data.categories);
    } catch (err) {
      Utility.showError(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: (market && market.name) || "",
      description: (market && market.description) || "",
      categoryId: (market && market.categoryId) || "",
      address: (market && market.address) || "",
    },
    validate,
    onSubmit: async (values) => {
      let payload = values;
      if (geo && geo.latitude !== ""){
        payload = { ...values, ...geo };
      } 
      setIsLoading(true);
      try {
        if (mode === "edit") {
          await HttpService.updateMarket(market.id, payload);
          Utility.showSuccess();
        } else {
          const { data: { data } } = await HttpService.addMarket(payload);
          history.push('/admin/market/' + data.id);         
        }
        setIsLoading(false);
      } catch (err) {
        Utility.showError(err);
        setIsLoading(false);
      }
    },
  });

  const handleGeo = React.useCallback(
    ({ lat, lng, add }) =>
      setGeo((prevState) => {
        return { ...prevState, latitude: lat, longitude: lng, address: add };
      }),
    []
  );

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit} style={{width: '50%'}}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationFormik01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
              isValid={formik.touched.name && !formik.errors.name}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationFormik02">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              isInvalid={formik.touched.description && !!formik.errors.description}
              isValid={formik.touched.description && !formik.errors.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationFormik03">
            <Form.Label>Address</Form.Label>
            <Search formik={formik} panTo={handleGeo} />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationFormik04">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={formik.touched.categoryId && !formik.errors.categoryId}
              isInvalid={formik.touched.categoryId && !!formik.errors.categoryId}
              as="select"
              custom
            >
              <option value="" label="Select a Category" />
              {categories &&
                categories.map((item, key) => (
                  <option key={key} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.categoryId}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {isLoading ? (<Loader />) : (<Button type="submit" size="sm">{mode === "edit" ? "Update" : "Create"}</Button>)}    
      </Form>
    </>
  );
};

export default AddMarket;

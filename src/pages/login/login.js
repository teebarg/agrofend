import React, {useState} from "react";
import { useFormik } from "formik";
import { HttpService } from "../../services/httpService";
import { Utility } from "../../util/utility";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";
import Header from "../../components/header/header";
import Loader from "../../components/loader/Loader";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Minimun of 6";
  }

  return errors;
};

const Login = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await HttpService.login(values);
        Cookies.set("agro_cookie", data.data[0].token);
        history.push("/admin");
        setIsLoading(false);
      } catch (err) {
        Utility.showError(err);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Header />
      <div className={"login__wrapper"}>
        <Form onSubmit={formik.handleSubmit} className={"elevate"}>
          <h4 style={{ fontWeight: 600, textAlign: "center" }}>Admin Login</h4>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={formik.handleChange}
              isInvalid={formik.touched.email && !!formik.errors.email}
              isValid={formik.touched.email && !formik.errors.email}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              isInvalid={formik.touched.password && !!formik.errors.password}
              isValid={formik.touched.password && !formik.errors.password}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {isLoading ? (
            <Loader />
          ) : (
            <Button variant="primary" type="submit">
            Submit
          </Button>
          )}
        </Form>
      </div>
    </>
  );
};

export default Login;

import Header from "../components/Header";
import Input from "../components/Input";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

export default function SignIn() {
  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    //Username Validation
    if (!values.username) errors.username = "username cannot be empty";
    else if (/\s/.test(values.username))
      errors.username = "Username cannot contain spaces";
    else if (values.username.length < 8) {
      errors.username = "Username must be at least 8 characters long";
    }

    return errors;
  };

  const onSubmit = async () => {
    const data = {
      username: formik.values.username,
      password: formik.values.password,
    };
    const urlSignIn = "http://localhost:9000/signin";
    try {
      const response = await axios.post(urlSignIn, data);
      if (response.data.message === "Login successful") {
        localStorage.setItem("username", formik.values.username);
        navigate("/tasks");
      } else {
        // Handle other cases like invalid credentials or user not found
        formik.setErrors({ password: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error Logging in:", error);
    }
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  useEffect(() => {
    if (!formik.values.username) {
    } else if (formik.values.username.length < 8) {
    } else {
      const urlUsername = "http://localhost:9000/checkUsername";

      if (formik.values.username) {
        axios
          .post(urlUsername, { username: formik.values.username })
          .then((response) => {
            if (response.data.available) {
              formik.setErrors({ username: "username not found" });
            }
          })
          .catch((error) => {
            console.error("Error checking username:", error);
          });
      }
    }
  }, [formik.values.username]);

  return (
    <>
      <div className="main-container">
        <Header />
        <div className="form-wrapper">
          <h1 className="color-main">SignIn</h1>
          <Input
            details={{
              type: "text",
              label: "Username",
              name: "username",
              onChange: formik.handleChange,
              value: formik.values.username,
            }}
          />
          {/* <span className="form-error">Username not found</span> */}
          {formik.errors.username && (
            <span className="form-error">{formik.errors.username}</span>
          )}
          <Input
            details={{
              type: "password",
              label: "Password",
              name: "password",
              onChange: formik.handleChange,
              value: formik.values.password,
            }}
          />

          {/* <span className="form-error">Invalid Password</span> */}
          {formik.errors.password && (
            <span className="form-error">{formik.errors.password}</span>
          )}
          <button className="btn" onClick={() => onSubmit()}>
            Continue
          </button>
          <Link to="/forgot-password" className="a-forgot">
            Forgot Password?
          </Link>
          <span className="signup-span">
            Don't have an accout?{" "}
            <Link to="/signup" className="color-prime">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

import Header from "../components/Header";
import Input from "../components/Input";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useRef } from "react";

export default function SignUp() {
  const initialValues = { email: "", username: "", password: "" };
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    //Email validation
    if (!values.email) {
      errors.email = "Email cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    //Username Validation
    if (!values.username) errors.username = "Username cannot be empty";
    else if (values.username.length < 5)
      errors.username = "Length of username should be at least 5";
    else if (/\s/.test(values.username))
      errors.username = "Username cannot contain spaces";

    // Password validation
    if (!values.password) {
      errors.password = "Password cannot be empty";
    } else if (values.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }

    return errors;
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 5) {
      return "Weak";
    } else if (password.length < 8) {
      return "Medium";
    } else {
      return "Strong";
    }
  };

  const onSubmit = async () => {
    const data = {
      email: formik.values.email,
      username: formik.values.username,
      password: formik.values.password,
    };
    console.log(data);
    const urlRegisterUser = "http://localhost:9000/signup";
    try {
      const response = await axios.post(urlRegisterUser, data);
      alert("Registered successfully");
      navigate("/");
      // Redirect or perform any other action upon successful registration
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const formik = useFormik({ initialValues, validate, onSubmit });
  useEffect(() => {
    if (
      !formik.values.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formik.values.email)
    ) {
    } else {
      const urlEmail = "http://localhost:9000/checkEmail";

      if (formik.values.email) {
        axios
          .post(urlEmail, { email: formik.values.email })
          .then((response) => {
            if (!response.data.available) {
              formik.setErrors({ email: "Email already in use." });
            }
          })
          .catch((error) => {
            console.error("Error checking email:", error);
          });
      }
    }
  }, [formik.values.email]);

  useEffect(() => {
    if (!formik.values.username || formik.values.username < 5) {
    } else {
      const urlUsername = "http://localhost:9000/checkUsername";

      if (formik.values.username) {
        axios
          .post(urlUsername, { username: formik.values.username })
          .then((response) => {
            if (!response.data.available) {
              formik.setErrors({ username: "Username already taken." });
            }
          })
          .catch((error) => {
            console.error("Error checking email:", error);
          });
      }
    }
  }, [formik.values.username]);

  const passwordStrengthClass = () => {
    const strength = calculatePasswordStrength(formik.values.password);

    // Map strength levels to CSS classes
    if (strength === "Weak") {
      return "weak-strength";
    } else if (strength === "Medium") {
      return "medium-strength";
    } else {
      return "strong-strength";
    }
  };

  const renderPasswordStrengthSegments = () => {
    const passwordLength = formik.values.password.length;

    const segments = Array.from({ length: 12 }, (_, index) => (
      <div
        key={index}
        className={`password-strength-segment ${
          passwordLength > index ? passwordStrengthClass() : ""
        }`}
      />
    ));

    return <div className="password-strength-bar">{segments}</div>;
  };

  return (
    <div className="main-container">
      <Header />
      <div className="form-wrapper">
        <h1 className="color-main">SignUp</h1>
        <Input
          details={{
            type: "text",
            label: "Email",
            name: "email",
            value: formik.values.email,
            onChange: formik.handleChange,
          }}
        />
        {formik.errors.email && (
          <span className="form-error">{formik.errors.email}</span>
        )}
        <Input
          details={{
            type: "text",
            label: "Username",
            name: "username",
            onChange: formik.handleChange,
            value: formik.values.username,
          }}
        />
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
        <div className="password-indicator">
          <span className="">
            Password Strength:{" "}
            {calculatePasswordStrength(formik.values.password)}
          </span>
          {renderPasswordStrengthSegments()}
        </div>

        <button className="btn" onClick={() => onSubmit()}>
          Continue
        </button>

        <span className="signup-span">
          Already have an account?{" "}
          <Link to="/" className="color-prime">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}

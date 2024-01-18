import Header from "../components/Header";
import Input from "../components/Input";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const initialValues = { email: "" };

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    //Email validation
    if (!values.email) {
      errors.email = "Email cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const onSubmit = (values) => {
    alert("Submitted");
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  return (
    <>
      <div className="main-container">
        <Header />
        <div className="form-wrapper-fp">
          <h1 className="color-main">Forgot Password</h1>
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

          <button className="btn" onClick={onSubmit}>
            Submit
          </button>
          <button className="btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}

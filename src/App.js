import React from "react";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

import { Styles } from "./Styles";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField(props, "checkbox");

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

function App() {
  return (
    <Styles>
      <Formik
        initialValues={{
          name: "",
          email: "",
          acceptedTerms: false,
          specialPower: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values));
            resetForm();
            setSubmitting(false);
          }, 1000);
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(3).max(15).required(),
          email: Yup.string().email().required(),
          acceptedTerms: Yup.boolean()
            .required()
            .oneOf([true], "Terms must be accepted"),
          specialPower: Yup.string()
            .oneOf(["flight", "other"], "Invalid special power")
            .required(),
        })}
      >
        {(props) => {
          return (
            <Form>
              <h1>Sign Up</h1>
              <CustomTextInput label="Name" name="name" type="text" />
              <CustomTextInput label="Email" name="email" type="email" />
              <CustomSelect label="Special Power" name="specialPower">
                <option value="flight">Flight</option>
                <option value="other">Other</option>
              </CustomSelect>
              <CustomCheckBox name="acceptedTerms">Accept Terms</CustomCheckBox>
              <button type="submit">
                {props.isSubmitting ? "Loading" : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </Styles>
  );
}

export default App;

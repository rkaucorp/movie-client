import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import useHook from "../../store/hook";
import InputButton from "../InputButton";

export default function Index() {
  const { userRegistration } = useHook();
  const state: any = useSelector(state => state);
  const [values, setValues]: any = useState({
    email: "",
    password: "",
    name: "",
    errors: {}
  });
  const { email, password, name, errors } = values;

  const handleChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [name]: e.target.value });
    };
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (!email) {
      return setValues({
        ...values,
        errors: { email: "Please Enter A Valid Email Address" }
      });
    }
    if (!password) {
      return setValues({
        ...values,
        errors: { password: "Please Enter Your Password" }
      });
    }

    if (!name) {
      return setValues({
        ...values,
        errors: { name: "Please Enter Your Name" }
      });
    }
    const data = { email, password, name };
    userRegistration(data);
  };
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ textAlign: "center", marginBottom: "50px" }}
      >
        Please Enter Some Information Here
      </Typography>

      {state?.httpError && (
        <Typography
          variant="caption"
          gutterBottom
          component="div"
          sx={{ textAlign: "center", color: "red" }}
        >
          {state?.httpError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <InputButton
          fullWidth
          id="name"
          name="name"
          label="Your Name"
          value={name}
          onChange={handleChange("name")}
          helperText={errors["name"] && errors["name"]}
          error={errors.name}
        />
        <InputButton
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={email}
          onChange={handleChange("email")}
          helperText={errors["email"] && errors["email"]}
          error={errors.email}
        />
        <InputButton
          fullWidth
          id="password"
          name="password"
          label="Password"
          value={password}
          type="password"
          onChange={handleChange("password")}
          helperText={errors["password"] && errors["password"]}
          error={errors?.password}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <ToastContainer />
      </form>
    </>
  );
}

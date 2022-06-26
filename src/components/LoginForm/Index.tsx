import { Avatar, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import useHook from "../../store/hook";
import InputButton from "../InputButton";

const AvatarLayout = styled(Avatar)(({ theme }) => ({
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  height: "30%",
  width: "20%"
}));

export default function Index() {
  const { userLogin, resetHttpStateMessage } = useHook();
  const state: any = useSelector(state => state);
  const [values, setValues]: any = useState({
    email: "",
    password: "",
    errors: {}
  });
  const { email, password, errors } = values;

  useEffect(() => {
    resetHttpStateMessage();
  }, []);

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
    const data = { email, password };
    userLogin(data);
  };
  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        component="div"
        sx={{ textAlign: "center" }}
      >
        <AvatarLayout alt="Remy Sharp" src="/images/user.png" />
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ textAlign: "center" }}
      >
        Welcome
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
          Login
        </Button>
        <ToastContainer />
      </form>
    </>
  );
}

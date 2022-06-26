import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const TextFieldLayout = styled(TextField)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1)
}));

export default function Index(props: any) {
  return (
    <TextFieldLayout
      {...props}
      InputLabelProps={{
        shrink: true
      }}
      variant="standard"
    />
  );
}

import * as React from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import MovieBackground from "./assest/wallpaper.jpg";
import LoginTab from "./LoginTab";

const HomePageLayout = styled("div")(({ theme }) => ({
  alignItems: "center",
  width: "70%",
  margin: "auto",
  padding: theme.spacing(1),
  ...theme.mixins.toolbar
}));

const BoxContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(15),
  boxShadow: "-1px 2px 9px 0px rgba(0,0,0,0.75)"
}));

const DescriptionBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
  background: `url(${MovieBackground})`,
  height: "400px",
  backgroundRepeat: "repeat",
  backgroundSize: "cover"
}));

const UnorderList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  marginTop: theme.spacing(10)
}));

const ListItem = styled("li")(({ theme }) => ({
  color: "#fff",
  fontSize: "18px",
  fontStyle: "italic",
  padding: theme.spacing(1)
}));

export default function LoginCard() {
  return (
    <HomePageLayout>
      <BoxContainer>
        <Grid container>
          <Grid item lg={6} md={6} sm={2} xs={12}>
            <DescriptionBox>
              <UnorderList>
                <ListItem>
                  The American Film Institute proudly curates lists to celebrate
                  excellence in the art form. We believe their greatest impact
                  is to inspire personal, passionate discussions about what
                  makes a great film and why and, also, to chart the evolution
                  of the art form. Since its inception, American film has
                  marginalized the diversity of voices that make our nation and
                  its stories strong – and these lists reflect that intolerable
                  truth.
                </ListItem>
              </UnorderList>
            </DescriptionBox>
          </Grid>
          <Grid item lg={6} md={6} sm={2} xs={12}>
            <LoginTab />
          </Grid>
        </Grid>
      </BoxContainer>
    </HomePageLayout>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { movie } from "../../Interface";
const UnorderLayout = styled("ul")(({ theme }) => ({
  padding: theme.spacing(1),
  listStyle: "none"
}));

const ListItem = styled("li")(({ theme }) => ({
  color: "#000",
  fontSize: "14px",
  fontStyle: "italic",
  borderBottom: "1px solid #E8E6E6",
  padding: theme.spacing(1)
}));

const BoldLayout = styled("b")(({ theme }) => ({
  marginRight: "20px"
}));

export default function MovieList() {
  const state: any = useSelector(state => state);
  const { movies } = state;
  return (
    <>
      <UnorderLayout>
        {movies.length > 0 &&
          movies.map((movie: movie, index: number) => (
            <ListItem key={index}>
              <BoldLayout>{index + 1}</BoldLayout>
              {movie.title}
            </ListItem>
          ))}
      </UnorderLayout>
    </>
  );
}

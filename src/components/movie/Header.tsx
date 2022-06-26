import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import InputField from "../InputButton";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MovieModel from "./MovieModal";
import { movie } from "../../Interface";
import useHook from "../../store/hook";
const HeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between"
}));
export default function Header() {
  const [open, setOpen] = useState(false);
  const { setMovies, fetchMovieList } = useHook();
  const state: any = useSelector(state => state);
  const { movies } = state;
  const handleModal = () => {
    setOpen(!open);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const temMovies = movies;
    if (e.target.value.length === 0) {
      fetchMovieList();
    }
    const filterMovie = temMovies.filter((movie: movie) =>
      movie.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMovies(filterMovie);
  };
  return (
    <HeaderContainer>
      {open && <MovieModel open={open} setOpen={setOpen} />}
      <InputField
        fullWidth
        id="movieName"
        name="movieName"
        label="Filter By Movie Name"
        onChange={handleChange}
      />
      <IconButton
        color="primary"
        component="span"
        size="large"
        onClick={handleModal}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </HeaderContainer>
  );
}

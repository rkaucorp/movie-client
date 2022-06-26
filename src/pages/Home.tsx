import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import DrawerLayout from "../components/home";
import Header from "../components/movie/Header";
import MovieList from "../components/movie/MovieList";
import MoviePaginationButton from "../components/movie/MoviePaginationButton";
import useHook from "../store/hook";

const DashboardLayout = styled("div")(({ theme }) => ({
  alignItems: "center",
  width: "50%",
  margin: "auto",
  padding: theme.spacing(5),
  boxShadow: "2px 2px 15px -6px #000000",
  ...theme.mixins.toolbar
}));

const MovieContainer = styled("div")(({ theme }) => ({}));

export default function Home() {
  const { fetchMovieList } = useHook();
  useEffect(() => {
    async function getMovies() {
      await fetchMovieList();
    }
    getMovies();
  }, []);
  return (
    <DrawerLayout>
      <DashboardLayout>
        <MovieContainer>
          <Header />
        </MovieContainer>
        <MovieContainer sx={{ marginTop: "20px", padding: "5px" }}>
          <MovieList />
        </MovieContainer>
        <MovieContainer>
          <MoviePaginationButton />
        </MovieContainer>
      </DashboardLayout>
    </DrawerLayout>
  );
}

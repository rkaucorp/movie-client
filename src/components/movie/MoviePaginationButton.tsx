import React, { useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useHook from "../../store/hook";

export default function MoviePaginationButton() {
  const [start, setStart] = useState(5);
  const state: any = useSelector(state => state);
  const { movies } = state;
  const { moviePagination, setMovies } = useHook();
  const handlePagination = async () => {
    setStart(start => start + 5);
    const result = await moviePagination(start);
    const tempMovies = movies.concat(result);
    setMovies(tempMovies);
  };
  return (
    <>
      {movies.length > 4 && (
        <div style={{ textAlign: "center" }}>
          <Button variant="outlined" size="small" onClick={handlePagination}>
            Load More...
          </Button>
        </div>
      )}
    </>
  );
}

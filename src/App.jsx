import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import SortDropdown from "./components/SortDropdown";
import LoadMoreButton from "./components/LoadMoreButton";
import useFetchMovies from "./hooks/useFetchMovies";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`;
  const { data, isLoading, error } = useFetchMovies(url);

  useEffect(() => {
    if (data && data.results) {
      // Concatenate new movies to the existing movies state
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (isLoading) return (<p>Loading...</p>);

  if (error) return (<p>Oops! Something went wrong.</p>);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <Search />
        <SortDropdown />
      </header>
      <section className="movies">
        {
          movies.map((movie) => {
            return (
              <MovieCard key={movie.id} movie={movie} />
            );
          })
        }
      </section>
      <LoadMoreButton handleClick={handleLoadMoreClick} />
    </div>
  );
};
export default App;
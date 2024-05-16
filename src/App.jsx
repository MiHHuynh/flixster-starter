import { useState, useEffect } from "react";
import React from "react";
import { debounce } from 'lodash';

import "./App.css";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import SortDropdown from "./components/SortDropdown";
import LoadMoreButton from "./components/LoadMoreButton";
import useFetchMovies from "./hooks/useFetchMovies";

const App = () => {
  const [pageState, setPageState] = useState("Now Playing");
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestUrl, setRequestUrl] = useState("");

  useEffect(() => {
    if (pageState === "Now Playing") {
      setRequestUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`);
    } else if (pageState === "Search") {
      setRequestUrl(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${currentPage}`);
    }
  }, [pageState, searchQuery, currentPage]);

  const { data, isLoading } = useFetchMovies(requestUrl);

  useEffect(() => {
    if (data && data.results) {
      // Concatenate new movies to the existing movies state
      console.log("set data", data.results)
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageStateClick = (event) => {
    const newState = event.target.innerText;
    if (pageState !== newState) {
      setPageState(newState);
      // Reset movies when switching page state
      setMovies([]);
      // Reset current page to 1 when switching page state
      setCurrentPage(1);
    }
  };

  const handleSearchChange = (value) => {
    setMovies([]);
    setCurrentPage(1);
    setSearchQuery(value);
  };

  if (isLoading) return (<p>Loading...</p>);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <button onClick={handlePageStateClick}>Now Playing</button>
        <button onClick={handlePageStateClick}>Search</button>
        <SortDropdown />
      </header>
      {
        (pageState == "Search") && <Search handleSearchChange={handleSearchChange} />
      }
      {
        <>
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
        </>
      }
    </div>
  );
};
export default App;
import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import SortDropdown from "./components/SortDropdown";
import LoadMoreButton from "./components/LoadMoreButton";
import useFetchNowPlayingMovies from "./hooks/useFetchNowPlayingMovies";

const App = () => {
  const [pageState, setPageState] = useState("Now Playing");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`;
  const { data, isLoading, error } = useFetchNowPlayingMovies(url);

  useEffect(() => {
    if (data && data.results) {
      // Concatenate new movies to the existing movies state
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageStateClick = (event) => {
    if (pageState !== event.target.innerText) {
      setPageState(event.target.innerText);
    }
  }

  if (isLoading) return (<p>Loading...</p>);

  if (error) return (<p>Oops! Something went wrong.</p>);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <button onClick={handlePageStateClick}>Now Playing</button>
        <button onClick={handlePageStateClick}>Search</button>
        <SortDropdown />
      </header>
      {
        (pageState == "Now Playing") && (
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
        )
      }
      {
        (pageState == "Search") && <Search />
      }
    </div>
  );
};
export default App;
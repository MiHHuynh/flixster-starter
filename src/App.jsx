import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import SortDropdown from "./components/SortDropdown";
import LoadMoreButton from "./components/LoadMoreButton";

const App = () => {
  const [movies, setMovies] = useState([]);
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        console.log("json.results", json?.results);
        setMovies(json?.results);
      })
      .catch(err => console.error('error:' + err));
  }, []);

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
      <LoadMoreButton handleClick={() => {}} />
    </div>
  );
};
export default App;
import { useState, useEffect } from "react";
import React from "react";
import { debounce } from 'lodash';

import "./App.css";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import SortDropdown from "./components/SortDropdown";
import LoadMoreButton from "./components/LoadMoreButton";
import useFetchMovies from "./hooks/useFetchMovies";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

const App = () => {
  const [pageState, setPageState] = useState("Now Playing");
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestUrl, setRequestUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieGenres, setMovieGenres] = useState();

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

  useEffect(() => {
    //Fetch Genres
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    fetch(genresUrl, {
      method: "GET",
      headers: { accept: 'application/json', Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}` }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setMovieGenres(json);
      })
  }, []);

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

  const handleClickMovieCard = (movie) => {
    console.log("open modal")
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let selectedMovieGenres;
  if (selectedMovie) {
    console.log("***selectedmovie", selectedMovie);
    selectedMovieGenres = movieGenres?.genres.map((genre) => {
      if (selectedMovie?.genre_ids.indexOf(genre.id) !== -1) {
        console.log(genre.name)
        return genre.name;
      }
    })
  }

  console.log(movieGenres);
  console.log("selectedmovie genre ids", selectedMovie?.genre_ids)

  if (isLoading) return (<p>Loading...</p>);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <button onClick={handlePageStateClick}>Now Playing</button>
        <button onClick={handlePageStateClick}>Search</button>
        <SortDropdown />
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Pass the selectedMovie to the Modal component */}
        {selectedMovie && (
          <div className="modal-content">
            <h2>{selectedMovie.title}</h2>
            <h3>Overview: {selectedMovie.overview}</h3>
            <p>Release Date: {selectedMovie.release_date}</p>
            <p>
              <ul>
                {
                  selectedMovieGenres?.map((genre, id) => {
                    if (genre) {
                      return (
                        <li key={id}>{genre}</li>
                      );
                    }
                  })
                }
              </ul>
            </p>
            <img src={`https://image.tmdb.org/t/p/w200/${selectedMovie.poster_path}`} />
          </div>
        )}
      </Modal>
      {
        (pageState == "Search") && <Search handleSearchChange={handleSearchChange} />
      }
      {
        <>
          <section className="movies">
            {
              movies.map((movie) => {
                return (
                  <MovieCard key={movie.id} movie={movie} onClick={() => handleClickMovieCard(movie)} />
                );
              })
            }
          </section>
          <LoadMoreButton handleClick={handleLoadMoreClick} />
        </>
      }
      <Footer />
    </div>
  );
};
export default App;
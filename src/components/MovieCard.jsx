import { useState } from 'react'


// poster_path - image
// original_title
// title
// vote_average
const MovieCard = ({ movie }) => {
    //title={movie.title} posterPath={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
    // movie.title
    // movie.poster_path
    // movie.vote_average
    return (
        <div className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
        </div>
    )
}

export default MovieCard;

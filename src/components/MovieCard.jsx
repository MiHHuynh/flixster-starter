import { useState } from 'react'

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className='movie-card' onClick={onClick}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
        </div>
    )
}

export default MovieCard;

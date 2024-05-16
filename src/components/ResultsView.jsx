import { useState } from 'react'
import LoadMoreButton from './LoadMoreButton';

const ResultsView = ({ movie }) => {
    //title={movie.title} posterPath={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
    // movie.title
    // movie.poster_path
    // movie.vote_average
    return (
        <div className='results-view'>
            <div className='header-content'></div>
            <div className='results-grid'></div>
            <LoadMoreButton handleClick={handleLoadMoreClick} />
        </div>
    )
}

export default ResultsView;

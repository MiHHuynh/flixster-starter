import { useState } from 'react'
// import './App.css'

const LoadMoreButton = ({handleClick}) => {
    return (
        <button className="load-more-button" onClick={handleClick}>Load More</button>
    )
}

export default LoadMoreButton;

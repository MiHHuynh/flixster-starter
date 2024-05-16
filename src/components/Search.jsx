import { useState } from 'react'
// import './App.css'

const Search = ({ searchQuery, handleSearchChange }) => {
    return (
        <>
            <input className="search-input" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
        </>
    )
}

export default Search;

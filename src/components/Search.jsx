import { useState } from 'react';

const Search = ({ searchQuery, handleSearchChange }) => {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        console.log("inputvalue", inputValue)
        handleSearchChange(inputValue);
    };

    return (
        <>
            <input
                className="search-input"
                type="text"
                value={searchQuery}
                onChange={handleChange} // Attach the handleChange function to the onChange event
                placeholder="Search"
            />
        </>
    );
};

export default Search;

const SortDropdown = ({onChange}) => {
    // popularity
    // release_date
    // vote_average
    return (
        <select name="sortby" id="sortby" onChange={onChange}>
            <option>Sort By</option>
            <option value="popularity">Popularity Descending</option>
            <option value="release_date">Release Date Descending</option>
            <option value="vote_average">Rating Descending</option>
        </select>
    )
}

export default SortDropdown;

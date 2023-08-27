import React from "react";

const Search = (userDetails) => {
    const { changeSearch } = userDetails;

    return (
        <form onChange={(e) => changeSearch(e.target.value)}>
            <input className="search-bar" placeholder="Search by name, email or role"></input>
        </form>
    );
};

export default Search;

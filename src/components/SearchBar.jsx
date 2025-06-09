import React, { useState, useRef } from "react";

function SearchBar({ onSearch }) {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleClick = () => {
    if (active && search) {
      onSearch(search);
      setSearch("");
    } else {
      setActive((prev) => !prev);
      inputRef.current?.focus();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form
      className={`search ${active ? "active" : ""}`}
      role="search"
      aria-label="Site search"
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        type="text"
        className="input"
        placeholder="Search..."
        ref={inputRef}
        value={search}
        onChange={handleChange}
        required
        aria-label="Search input"
      />

      <button
        className="btn"
        type="submit"
        aria-label="Submit search"
        onClick={handleClick}
      >
        <i className="fas fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
}

export default SearchBar;

import React, { useState, useRef } from "react";

function SearchBar({ onSearch }) {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!active) {
      // If input is not active, open it and focus. Don't search yet.
      setActive(true);
      inputRef.current?.focus();
      return;
    }

    // If input is active but empty, prevent submission (required will show browser validation)
    if (active && search.trim() === "") {
      // Optionally show a message here
      return;
    }

    // If input is active and has value, perform the search
    onSearch(search);
    setSearch("");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form
      className={`search ${active ? "active" : ""}`}
      role="search"
      aria-label="Site search"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      {active && (
        <input
          id="search-input"
          type="text"
          className="input"
          placeholder="Search..."
          ref={inputRef}
          value={search}
          onChange={handleChange}
          required={active} // required only applies when input is visible
          aria-label="Search input"
        />
      )}

      <button className="btn" type="submit" aria-label="Submit search">
        <i className="fas fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
}

export default SearchBar;

import React, { useState, useRef } from "react";

function SearchBar() {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleClick = () => {
    if (active && search) {
      console.log(search);
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
    <div className={`search ${active ? "active" : ""}`}>
      <input
        type="text"
        className="input"
        placeholder="Search..."
        ref={inputRef}
        value={search}
        onChange={handleChange}
        required
      />
      <button className="btn" onClick={handleClick}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;

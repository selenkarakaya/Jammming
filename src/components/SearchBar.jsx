function SearchBar({ onSearch }) {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
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
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        id="search-input"
        type="text"
        className="input"
        placeholder="Search..."
        ref={inputRef}
        value={search}
        onChange={handleChange}
        required
        aria-label="Search input"
      />

      <button className="btn" type="submit" aria-label="Submit search">
        <i className="fas fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
}

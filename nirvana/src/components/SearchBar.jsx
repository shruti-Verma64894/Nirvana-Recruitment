const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name, email, phone or candidate ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
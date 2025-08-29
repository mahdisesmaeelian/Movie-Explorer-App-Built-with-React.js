export default function Search({ query, setQuery }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="form-control"
      />
    </div>
  );
}

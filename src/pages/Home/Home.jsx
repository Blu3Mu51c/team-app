import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"
import './Home.css'

export default function Home() {
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    const term = e.currentTarget.q.value.trim();
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <main className="container" style={{ padding: "1.5rem 1rem" }}>
      {/* Hero / Logo */}
      <section
        style={{
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: "2rem 1rem",
          borderRadius: 12,
          marginBottom: "1.5rem",
        }}
      >

        {/* <form onSubmit={onSearch} className="search" style={{ marginTop: 16, width: "100%", maxWidth: 560, display: "flex", gap: 8 }}>
          <label htmlFor="q" className="sr-only">Search</label>
          <input id="q" name="q" placeholder="Search movies…" style={{ flex: 1 }} />
          <button type="submit">Search</button>
        </form> */}

        <form 
          onSubmit={onSearch} 
          className="search-form"
        >
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input id="q" name="q" placeholder="Search movies…" />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>
    </main>
  );
}

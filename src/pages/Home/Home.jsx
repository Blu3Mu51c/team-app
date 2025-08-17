import { useNavigate, Link } from "react-router-dom";
// import Header from "../../components/Header/Header";
// import Nav from "../../components/Nav/Nav";
// import Footer from "../../components/Footer/Footer";

// src/pages/Home/Home.jsx
// import { useNavigate, Link } from "react-router-dom";

const CATEGORIES = ["Action", "Comedy", "Drama", "Sci-Fi", "Romance", "Animation"];

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
          border: "1px solid #1f2937",
          background: "linear-gradient(180deg, rgba(2,6,23,.6), rgba(2,6,23,.3))",
          marginBottom: "1.5rem",
        }}
      >
        <img src="/vite.svg" alt="App Logo" width="96" height="96" style={{ marginBottom: 12 }} />
        <h1 style={{ margin: 0 }}>Mini Movie Explorer</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Search, browse, and save movies to your watchlist.
        </p>

        {/* Search bar → /search?q=... */}
        <form onSubmit={onSearch} className="search" style={{ marginTop: 16, width: "100%", maxWidth: 560, display: "flex", gap: 8 }}>
          <label htmlFor="q" className="sr-only">Search</label>
          <input id="q" name="q" placeholder="Search movies…" style={{ flex: 1 }} />
          <button type="submit">Search</button>
        </form>
      </section>

      {/* Quick category links → /search?genre=... (your Search page can read either q or genre) */}
      <section>
        <h2>Explore by Category</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          {CATEGORIES.map(c => (
            <Link
              key={c}
              to={`/search?genre=${encodeURIComponent(c.toLowerCase())}`}
              style={{ padding: "8px 12px", border: "1px solid #1f2937", borderRadius: 999, textDecoration: "none" }}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

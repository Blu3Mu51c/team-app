import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import Header from "../../components/Header/Header";
// import Nav from "../../components/Nav/Nav";
// import Footer from "../../components/Footer/Footer";

// // src/pages/Movie/Movie.jsx
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

export default function Movie() {
  const { id } = useParams();            // imdbID from /details/:id
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = import.meta.env.VITE_OMDB_KEY;

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const url = `https://www.omdbapi.com/?apikey=${KEY}&i=${id}&plot=full`;
        const res = await fetch(url);
        const data = await res.json();
        if (!ignore) {
          if (data.Response === "True") setMovie(data);
          else setError(data.Error || "Not found");
        }
      } catch {
        if (!ignore) setError("Network error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [id, KEY]);

  if (loading) return <main className="container"><p className="muted">Loading…</p></main>;
  if (error)   return <main className="container"><p className="error">{error}</p></main>;
  if (!movie)  return <main className="container"><p className="muted">No data.</p></main>;

  return (
    <main className="container" style={{ padding: "1.5rem 1rem" }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/search" style={{ textDecoration: "none" }}>← Back to Search</Link>
      </div>

      <article
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 320px) 1fr",
          gap: "1rem",
          alignItems: "start",
          border: "1px solid #1f2937",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--panel, #0b1324)",
        }}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ padding: "1rem" }}>
          <h1 style={{ marginTop: 0 }}>
            {movie.Title} <span className="muted">({movie.Year})</span>
          </h1>
          <p>{movie.Genre} • {movie.Runtime} • Rated {movie.Rated}</p>
          <p className="plot" style={{ marginTop: 12 }}>{movie.Plot}</p>

          <div style={{ marginTop: 12 }}>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            {movie.Awards && <p><strong>Awards:</strong> {movie.Awards}</p>}
            {movie.Ratings?.length > 0 && (
              <p><strong>Ratings:</strong> {movie.Ratings.map(r => `${r.Source} ${r.Value}`).join(" · ")}</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

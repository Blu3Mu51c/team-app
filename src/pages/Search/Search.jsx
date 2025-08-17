// pages/Search/Search.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies, getMovieDetails } from "../../lib/omdb.js";
import { FaSearch } from "react-icons/fa"
import './Search.css'

export default function Search() {
    const [term, setTerm] = useState("");
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");

useEffect(() => {
  let ignore = false;

  async function run() {
    setLoading(true);
    setError("");

    // Determine search term
    let searchTerm = term;

    // If no search term but any filter is active, use the first active filter as search
    if (!term) {
      if (genre && genre !== "all") searchTerm = genre;
      else if (year && year !== "0") searchTerm = ""; // OMDB doesn't search by year only, we can fetch popular or leave empty
      else if (rating && rating !== "0") searchTerm = ""; // same for rating
    }

    const { items: arr, total: t, error: e } = searchTerm
      ? await searchMovies(searchTerm, page)
      : await searchMovies("spider", page); // fallback to some query so we get results

    if (!ignore) {
      if (e) { setError(e); setLoading(false); return; }

      const detailed = await Promise.all(
        arr.map(async (m) => {
          const details = await getMovieDetails(m.imdbID);
          return { ...m, ...details };
        })
      );

      
      setItems(detailed);
      setTotal(t);
      setLoading(false);
    }
  }

  run();
  return () => { ignore = true; };
}, [term, page, genre, year, rating]);



const pages = Math.max(1, Math.ceil(total / 10));
const filteredItems = items.filter(m => {
  
    // Genre filter
  if (genre && genre !== "all" && !m.Genre?.toLowerCase().includes(genre.toLowerCase())) 
    return false;

  // Year filter
  if (year && year !== "0") {
    if (year.includes("-")) {
      const [start, end] = year.split("-").map(Number);
      const movieYear = Number(m.Year?.slice(0,4));
      if (!movieYear || movieYear < start || movieYear > end) return false;
    } else {
      if (m.Year !== year) return false;
    }
  }

  // Rating filter
  if (rating && rating !== "0" && parseFloat(m.imdbRating || 0) < parseFloat(rating)) 
    return false;

  return true;
});


    return (
        <section className="container">
            <h1 class="search">Search</h1>

            {/* <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                    setTerm(e.currentTarget.q.value.trim());
                }}
                className="search"
            >
                <input name="q" placeholder="Search movies…" />
                <button>Go</button>
            </form> */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPage(1);
                setTerm(e.currentTarget.q.value.trim());
              }}
              className="search-form"  
            >
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input 
                  name="q" 
                  placeholder="Search movies…" 
                  className="search-input"  
                />
              </div>
              <button type="submit" className="search-button">Search</button>  
            </form>

            {/* Filters */}
            <div className="filters">

                <select onChange={(e) => setGenre(e.target.value)}>
                    <option value="all">All</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="animation">Animation</option>
                    <option value="biography">Biography</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="documentary">Documentary</option>
                    <option value="drama">Drama</option>
                    <option value="family">Family</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="film-noir">Film-Noir</option>
                    <option value="game-show">Game-Show</option>
                    <option value="history">History</option>
                    <option value="horror">Horror</option>
                    <option value="music">Music</option>
                    <option value="musical">Musical</option>
                    <option value="mystery">Mystery</option>
                    <option value="news">News</option>
                    <option value="reality-tv">Reality-TV</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="sport">Sport</option>
                    <option value="talk-show">Talk-Show</option>
                    <option value="thriller">Thriller</option>
                    <option value="war">War</option>
                    <option value="western">Western</option>
                </select>

                <select onChange={(e) => setYear(e.target.value)}>
                    <option value="0">All</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2020-2025">2020-now</option>
                    <option value="2010-2025">2010-now</option>
                    <option value="2010-2019">2010-2019</option>
                    <option value="2000-2009">2000-2009</option>
                    <option value="1990-1999">1990-1999</option>
                    <option value="1980-1989">1980-1989</option>
                    <option value="1970-1979">1970-1979</option>
                    <option value="1900-1969">1900-1969</option>
                </select>

                <select onChange={(e) => setRating(e.target.value)}>
                    <option value="0">All</option>
                    <option value="9">9+</option>
                    <option value="8">8+</option>
                    <option value="7">7+</option>
                    <option value="6">6+</option>
                    <option value="5">5+</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                    <option value="2">2+</option>
                    <option value="1">1+</option>
                </select>

            </div>

            {loading && <p className="muted">Loading…</p>}
            {error && <p className="error">{error}</p>}

            <div className="grid">
                {filteredItems.map(m => (
                    <article key={m.imdbID} className="card-sm">
                        <Link to={`/details/${m.imdbID}`}><img src={m.Poster !== "N/A" ? m.Poster : "/placeholder.png"} alt={m.Title} /></Link>
                        <div style={{ padding: ".5rem .75rem" }}>
                            <strong>{m.Title}</strong>
                            <p>{m.Year}</p>
                            <p>{m.Genre}</p>
                            <p>⭐ {m.imdbRating}</p>
                            <Link to={`/details/${m.imdbID}`}><button>Details</button></Link>
                        </div>
                    </article>
                ))}
            </div>

            {pages > 1 && (
                <div className="pager">
                    <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                    <span>{page} / {pages}</span>
                    <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
                </div>
            )}
        <div></div>
        </section>
    );
}



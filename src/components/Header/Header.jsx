import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";

import './Header.css'
import Nav from "../Nav/Nav";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

// export default function Header() {
//   const [posters, setPosters] = useState([]);
//   const [index, setIndex] = useState(0);
//   const location = useLocation();

//   useEffect(() => {
//     async function fetchPosters() {
//       let results = [];

      
//       for (let page = 1; page <= 3; page++) {
//         const res = await fetch(
//           `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=star&page=${page}`
//         );
//         const data = await res.json();

//         if (data.Response === "True") {
//           const pagePosters = data.Search
//             .filter(movie => movie.Poster !== "N/A")
//             .map(movie => movie.Poster);

//           results = results.concat(pagePosters);
//         }
//       }

//       setPosters(results);
//     }

//     fetchPosters();
//   }, []);

//   useEffect(() => {
//     if (posters.length === 0) return;

//     const timer = setInterval(() => {
//       setIndex(i => (i + 1) % posters.length);
//     }, 9000); 

//     return () => clearInterval(timer);
//   }, [posters]);

//   if (location.pathname === "/") {
//   return (
//     <header >
    
//       {posters.length > 0 ? (
//         <img
//           src={posters[index]}
//           alt="Movie Poster"
          
//         />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </header>
//   );
// }
// else {
  
// }
// }

export default function Header() {
  const [posters, setPosters] = useState([]); 
  const [index, setIndex] = useState(0);
  const location = useLocation();

  // --- تحميل الأفلام من API
  useEffect(() => {
    async function fetchPosters() {
      let results = [];

      for (let page = 1; page <= 3; page++) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=star&page=${page}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          const pagePosters = data.Search.filter(movie => movie.Poster !== "N/A").map(movie => movie.Poster);
          results = results.concat(pagePosters);
        }
      }

      setPosters(results);
    }

    fetchPosters();
  }, []);

 
  useEffect(() => {
    if (posters.length === 0) return;

    const timer = setInterval(() => {
      setIndex(i => (i + 1) % posters.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [posters]);

  // --- JSX
  if (location.pathname === "/") {
    const currentMovie = posters[index];

    return (
      <header
        className="header"
        style={{
          backgroundImage: currentMovie ? `url(${currentMovie.Poster})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "14cm",
        }}
      >
        <Nav />
        
        {/* اسم الفيلم في الأسفل */}
        {currentMovie && (
          <div className="movie-title">
            <Link to={`/Movie/${currentMovie.imdbID}`}>
              {currentMovie.Title}
            </Link>
          </div>
        )}
      </header>
    );
  } else {
    return (
      <header className="header">
        <Nav />
      </header>
    );
  }
}
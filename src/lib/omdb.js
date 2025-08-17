
const KEY = import.meta.env.VITE_OMDB_KEY;

export async function searchMovies(term, page=1){
  if(!term) return { items:[], total:0 };
  const url = `https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(term)}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.Response === "True"){
    return { items: data.Search, total: Number(data.totalResults||0) };
  }
  return { items:[], total:0, error: data.Error || "No results" };
}

export async function getMovieById(id){
  const url = `https://www.omdbapi.com/?apikey=${KEY}&i=${id}&plot=full`;
  const res = await fetch(url);
  return await res.json();
}
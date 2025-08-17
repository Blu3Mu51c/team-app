
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx"
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Search from "./pages/Search/Search.jsx";
import Movie from "./pages/Movie/Movie.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
       <Footer />
    </div>
  );
}

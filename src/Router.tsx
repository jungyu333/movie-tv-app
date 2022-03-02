import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";

import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

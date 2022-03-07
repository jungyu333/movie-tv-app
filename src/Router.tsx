import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./Routes/DetailPage";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";

import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import TvDetailPage from "./Routes/TvDetailPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />}>
          <Route path="/movie/:movieId" element={<Movie />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:tvId" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="/search/:keyword" element={<Search />} />
        </Route>
        <Route path="/movie/:movieId/detail" element={<DetailPage />} />
        <Route path="/tv/:tvId/detail" element={<TvDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

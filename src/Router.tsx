import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { IRouterProps } from "./App";
import DetailPage from "./Routes/DetailPage";
import Home from "./Routes/Home";
import LogInPage from "./Routes/LogInPage";
import Movie from "./Routes/Movie";
import NewLogInPage from "./Routes/NewLogInPage";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import TvDetailPage from "./Routes/TvDetailPage";

function Router({ isLogIn }: IRouterProps) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <>
          <Route
            path="/movie"
            element={
              isLogIn ? <Movie /> : <Navigate to={"/login"} replace={true} />
            }
          >
            <Route
              path="/movie/:movieId"
              element={
                isLogIn ? <Movie /> : <Navigate to={"/login"} replace={true} />
              }
            />
          </Route>
          <Route
            path="/tv"
            element={
              isLogIn ? <Tv /> : <Navigate to={"/login"} replace={true} />
            }
          >
            <Route
              path="/tv/:tvId"
              element={
                isLogIn ? <Tv /> : <Navigate to={"/login"} replace={true} />
              }
            />
          </Route>
          <Route
            path="/search"
            element={
              isLogIn ? <Search /> : <Navigate to={"/login"} replace={true} />
            }
          >
            <Route
              path="/search/:keyword"
              element={
                isLogIn ? <Search /> : <Navigate to={"/login"} replace={true} />
              }
            />
          </Route>
          <Route
            path="/movie/:movieId/detail"
            element={
              isLogIn ? (
                <DetailPage />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )
            }
          />
          <Route
            path="/tv/:tvId/detail"
            element={
              isLogIn ? (
                <TvDetailPage />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )
            }
          />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/login/new" element={<NewLogInPage />} />
        </>
      </Routes>
    </HashRouter>
  );
}

export default Router;

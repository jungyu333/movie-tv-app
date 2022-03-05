const API_KEY = "2240a192797236248fe07c10688e49b9";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IgetMoviesResults {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
export interface IgetMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  results: IgetMoviesResults[];
}

export interface IgetVideo {
  id: number;
  results: IgetVideoResults[];
}

export interface IgetVideoResults {
  id: string;
  key: string;
}

export interface IgetMovieDetail {
  genres: [
    {
      name: string;
    }
  ];
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
}
export function getMovieNowPlaying() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getUpcomingMovie() {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTopRatedMovie() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getVideoMovie(movieId: number) {
  return fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieDetail(movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

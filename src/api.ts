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

export interface IgetMovieSimilar {
  results: IgetMoviesResults[];
}

export interface IgetTvOnTheAir {
  results: IgetTvOnTheAirResults[];
}

export interface IgetTvOnTheAirResults {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
}

export interface IgetTvDetail {
  name: string;
  episode_run_time: string[];
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  tagline: string;
}

export interface IgetTvSimilar {
  results: {
    backdrop_path: string;
    name: string;
    id: number;
    poster_path: string;
  }[];
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

export function getMovieSimilar(movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTvOnTheAir() {
  return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTvPopular() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTvTopRated() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTvDetail(tvId: string) {
  return fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTvVideo(tvId: string) {
  return fetch(`${BASE_URL}/tv/${tvId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvSimilar(tvId: string) {
  return fetch(
    `${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getMovieSearch(keyword: string) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}`
  ).then((response) => response.json());
}

export function getTvSearch(keyword: string) {
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&query=${keyword}`
  ).then((response) => response.json());
}

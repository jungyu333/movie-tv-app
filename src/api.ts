const API_KEY = "2240a192797236248fe07c10688e49b9";
const BASE_URL = "https://api.themoviedb.org/3";

interface IgetMovieNowPlayingResults {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
export interface IgetMovieNowPlaying {
  dates: {
    maximum: string;
    minimum: string;
  };
  results: IgetMovieNowPlayingResults[];
}

export function getMovieNowPlaying() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

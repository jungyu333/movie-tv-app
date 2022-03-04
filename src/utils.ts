export function makeImagePath(path: string, option?: string) {
  return `https://image.tmdb.org/t/p/${option ? option : "original"}/${path}`;
}

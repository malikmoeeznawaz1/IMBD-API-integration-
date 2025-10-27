
const TmdbBearrerToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2FiMWUyOGQ2MzZhNjRjNjJkYjY1ODUyNTc2YmE4ZSIsIm5iZiI6MTc2MTU0ODg3Ni43MjcsInN1YiI6IjY4ZmYxYTRjNDM2ZmQyYTRjZjJhYWI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zR_Fbx1ZRBCy1YdENcRa9frQHUT_JLNA6o0esAaIllg'
export const url1 = 'https://api.themoviedb.org/3/movie/';
export const url2 = '?language=en-US&page=1';

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: TmdbBearrerToken
  }
};
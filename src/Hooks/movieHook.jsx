// not used yet

import { useEffect, useState } from 'react';
import axios from 'axios';
import { options, url1, url2 } from '../utils/url';

const useMovieHook = (movieSelected) => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    if (!movieSelected) return;
    let cancelled = false;

    const callAPI = async () => {
      try {
        const response = await axios.get(`${url1}${movieSelected}${url2}`, options);
        if (!cancelled) {
          setMoviesData(response.data?.results || response.data || []);
          console.log('Me aa raha hu:', response);
        }
      } catch (err) {
        if (!cancelled) {
          setMoviesData([]);
          console.error('Fetch error', err);
        }
      }
    };

    callAPI();
    return () => {
      cancelled = true;
    };
  }, [movieSelected]);

  return moviesData;
};

export default useMovieHook;


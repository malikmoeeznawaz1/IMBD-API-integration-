import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { url1, url2, options } from '../utils/url'
import MovieDetails from '../Components/MovieDetails'
import { CiSearch } from "react-icons/ci";

const Home = () => {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!started) return;

    const q = (searchQuery || '').trim();
    const t = setTimeout(async () => {
      try {
        if (!q) {
          const resp = await axios.get(`${url1}popular${url2}`, options)
          setMovies(resp.data?.results || [])
        } else {
          const resp = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}&page=1`, options)
          setMovies(resp.data?.results || [])
        }
      } catch (err) {
        console.error('Fetch error', err)
        setMovies([])
      }
    }, 700)

    return () => clearTimeout(t)
  }, [started, searchQuery])

  useEffect(() => {
    if (searchVisible) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [searchVisible]);

  return (
    <div className="min-h-screen bg-[#081026] text-[#e6eef8] flex items-center justify-center p-6">
      {!started ? (
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">MoviesIn</h1>
          <p className="text-slate-400 mb-5">Simple movie browser — dark landing</p>
          <button onClick={() => setStarted(true)} className="bg-cyan-400 text-[#012028] px-6 py-2 rounded-lg hover:opacity-95 cursor-pointer">Get Started</button>
        </div>
        ) : (
        <div className="w-full max-w-5xl px-4">
          <div className="flex max-w-5xl items-center justify-between mb-4 relative">
            <h2 onClick={()=> setStarted(!started)} className="text-lg font-medium cursor-pointer">Popular Movies</h2>
            {/* large screen input */}
            <input className='bg-slate-700 text-slate-200 px-4 py-2 rounded-md hidden sm:block' placeholder='Search...' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            {!searchVisible ? (
              <CiSearch size={26} className='block sm:hidden cursor-pointer absolute right-4' onClick={() => setSearchVisible(true)} />
            ) : (
              <input
                ref={searchRef}
                className='block sm:hidden bg-slate-700 text-slate-200 px-3 py-2 rounded-md w-40 absolute right-4 '
                placeholder='Search...'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setSearchVisible(false)}
              />
            )}
            <div>
              <button onClick={() => setStarted(false)} className="hidden sm:block mr-2 px-4 py-2 rounded-md bg-slate-700 text-slate-200 cursor-pointer">Back</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.length === 0 && <div className="text-slate-400">No movies to show.</div>}
            {movies.map((m, i) => {
              const posterBase = 'https://image.tmdb.org/t/p/w300';
              const poster = m.poster_path ? `${posterBase}${m.poster_path}` : null;
              return (
                <div key={m.id || i} className="bg-[#0b1622] p-3 rounded-lg text-white hover:scale-[1.01] transition-transform cursor-pointer" onClick={() => setSelected(m)}>
                  {poster ? (
                    <img src={poster} alt={m.title || m.name} className="w-full h-36 object-cover rounded-md mb-2"/>
                  ) : (
                    <div className="h-36 bg-slate-800 rounded-md flex items-center justify-center text-slate-400 mb-2">No image</div>
                  )}

                  <div className="font-semibold">{m.title || m.name || 'Untitled'}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selected && <MovieDetails movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default Home
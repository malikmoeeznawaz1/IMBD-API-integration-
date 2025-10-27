import React from 'react'

const MovieDetails = ({ movie, onClose }) => {
    if (!movie) return null;

    const posterBase = 'https://image.tmdb.org/t/p/w500';
    const poster = movie.poster_path ? `${posterBase}${movie.poster_path}` : null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-[#071022] text-white rounded-lg w-11/12 max-w-4xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 relative">
                    <div className='absolute right-2 top-2 sm:hidden block'>
                        <button onClick={onClose} className="px-3 py-1 bg-slate-700 rounded-md cursor-pointer">✖️</button>
                    </div>
                    {poster ? (
                        <img src={poster} alt={movie.title || movie.name} className="w-full h-80 object-cover rounded-md" />
                    ) : (
                        <div className="w-full h-80 bg-slate-800 rounded-md flex items-center justify-center text-slate-400">No image</div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold">{movie.title || movie.name || 'Untitled'}</h3>
                        </div>
                        <div className='hidden sm:block'>
                            <button onClick={onClose} className="px-3 py-1 bg-slate-700 rounded-md cursor-pointer">✖️</button>
                        </div>
                    </div>

                    <div className="mt-4 text-slate-200 text-sm space-y-3">
                        {movie.overview && (
                            <p>{movie.overview}</p>
                        )}

                        <div className="flex flex-wrap gap-4 mt-2">
                            {movie.release_date && <div className="text-slate-400">Release: {movie.release_date}</div>}
                            {movie.vote_average != null && <div className="text-slate-400">Rating: {movie.vote_average}/10</div>}
                            {movie.vote_count != null && <div className="text-slate-400">Votes: {movie.vote_count}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails

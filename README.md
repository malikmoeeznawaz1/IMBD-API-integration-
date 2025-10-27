# MoviesIn — Simple TMDB Browser

A minimal React + Vite project that demonstrates fetching movie data from The Movie Database (TMDB) API, searching, and viewing movie details. The app uses Tailwind utility classes for a compact dark UI.

This workspace contains example code for:
- Fetching the popular movies list
- Live (debounced) search against TMDB
- A details modal showing poster + metadata

---

## Quick start (Windows / PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

---

## Project files (key)

- `src/Pages/Home.jsx` — Landing, search input, movie grid and interaction logic.
- `src/Hooks/movieHook.jsx` — (optional) small hook used earlier; the app now fetches directly in `Home.jsx`.
- `src/Components/MovieDetails.jsx` — Modal that shows poster on the left and details on the right.
- `src/utils/url.js` — Contains TMDB base URL pieces and the Bearer token used for requests.
- `package.json` — project dependencies and scripts.

---

## TMDB API token / Configuration

This project currently loads a Bearer token from `src/utils/url.js`. That file contains:

- `url1` and `url2` for API path construction
- `options` with the `Authorization` header set to a TMDB Bearer token

For production use, do NOT commit tokens in source. Instead:

- Put your token in an environment variable and load it at build time.
- Or use a server-side proxy to keep secrets off the client.

Example (quick dev change):

1. Open `src/utils/url.js` and replace the token with your own Bearer token (or wire in env variables).

---

## Behavior notes

- Live search: typing into the search box issues a debounced request to TMDB's `/search/movie` endpoint and updates the grid.
- Popular list: when the search box is empty and the app is started, the app fetches the popular movies list.
- Images: TMDB responses include `poster_path`; the app builds image URLs using `https://image.tmdb.org/t/p/w300` (cards) and `w500` (details).
- React 18 StrictMode: in development you may see effects run twice (React mounts/unmounts/remounts to detect side-effects). The app guards state updates to avoid duplicate logs/updates.

---

## Troubleshooting

- No images appearing: inspect a movie object in console and verify `poster_path` exists. The full image URL is `https://image.tmdb.org/t/p/w300${poster_path}`.
- 401 Unauthorized: check the Bearer token in `src/utils/url.js`.
- Slow search or flicker: consider canceling in-flight requests with AbortController or using `lodash.debounce` (small dependency already suggested).

---

## Next steps / ideas

- Move token to environment variables and remove it from source.
- Fetch full movie details (credits, runtime) when opening the details modal.
- Add pagination and infinite-scroll for the popular list.
- Add tests for the hook and search behavior.

If you want, I can make any of the above changes and run the dev server to verify.
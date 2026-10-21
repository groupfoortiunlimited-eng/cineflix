# CineFlix — Plain HTML, CSS & JavaScript

No React, no Tailwind, and no build step. Frontend files are `index.html`, `style.css`, and `script.js`.

## Run with real TMDB data
1. Install Node.js 18+.
2. Get a TMDB API key/token at https://www.themoviedb.org/settings/api.
3. Set it as a server environment variable:
   - macOS/Linux: `export TMDB_API_KEY="your_tmdb_api_key"`
   - Windows PowerShell: `$env:TMDB_API_KEY="your_tmdb_api_key"`
4. Run `node server.js` from this folder.
5. Visit http://localhost:8787.

The small Node server proxies `/api/*` to TMDB so the key stays out of browser JavaScript. Do not put the secret into `script.js`. The site includes responsive movie rows, search, details, genre/sort filters, pagination, official YouTube trailer embeds, and a localStorage watchlist.

Login/accounts are not implemented; use a secure authentication provider and database before offering real accounts. TMDB attribution and API terms apply. Only official promotional videos are embedded; this does not provide full-length unauthorized streams.

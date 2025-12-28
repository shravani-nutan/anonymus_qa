# Anonymus_QA

College Q&A platform — simple Node/Express backend and React frontend.

## Structure

- `server.js` — Express API server
- `config/` — DB connection
- `routes/` — API routes for questions/answers
- `qa_frontend/college-qa-frontend/` — React frontend

## Setup (dev)

1. Install deps from project root:
   ```bash
   npm install
   npm install --prefix qa_frontend/college-qa-frontend
   ```
2. Start both local servers (dev):
   ```bash
   npm run dev
   ```
   - Backend uses nodemon (port 8081)
   - Frontend runs on port 3000

## Build + Run (prod)

1. Build the frontend and run the server that serves static files:
   ```bash
   npm run start-prod
   ```
   - This runs `npm run build` in the frontend and starts `node server.js`.

## Notes

- The frontend expects the API at `http://localhost:8081/api` by default.
- Add a `.env` file for any environment-specific variables (and avoid checking it in).

## Submodules

The frontend is included as a nested Git repository at `qa_frontend/college-qa-frontend` (kept as a submodule reference in this repo). To clone and initialize submodules:

```bash
# clone with submodules
git clone --recurse-submodules https://github.com/shravani-nutan/anonymus_qa.git
# or, after a normal clone, initialize and fetch submodules
git submodule update --init --recursive
```

To update the submodule to the latest commit in its remote:

```bash
git submodule update --remote --merge
```

---

## License

MIT

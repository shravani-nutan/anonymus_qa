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

## License

MIT

# Anonymus_QA

College Q&A platform — simple Node/Express backend and React frontend.

## Table of contents

- [About](#about)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Setup (development)](#setup-development)
- [Run (development)](#run-development)
- [Build & Run (production)](#build--run-production)
- [API endpoints](#api-endpoints)
- [Submodules](#submodules)
- [Contributing](#contributing)
- [License](#license)

## About

This is a minimal College Q&A platform: an Express backend with MongoDB for persistence and a React frontend. The repo keeps the frontend as a nested repo in `qa_frontend/college-qa-frontend` (submodule).

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Create React App), Axios
- Dev utilities: nodemon, concurrently

## Repository structure

- `server.js` — Express API server and static file serving
- `config/` — DB connection (`config/db.js`)
- `routes/` — API routes (`/api/questions`, `/api/answers`)
- `qa_frontend/college-qa-frontend/` — React frontend (kept as a submodule)

## Prerequisites

- Node.js (16+ recommended)
- npm
- MongoDB (local or remote)

## Environment variables

Create a `.env` in the project root (or set environment variables) with at least:

- `MONGO_URI` — MongoDB connection string
- `PORT` — (optional) server port, default 8081

Do not commit `.env` to the repository.

## Setup (development)

1. Install dependencies for the root project:

```bash
npm install
```

2. Initialize the frontend submodule and install its dependencies:

```bash
# from repo root
# initialize submodule (only the first time or after a clone)
git submodule update --init --recursive
# install frontend deps
npm install --prefix qa_frontend/college-qa-frontend
```

## Run (development)

Run both servers concurrently (backend + frontend dev server):

```bash
npm run dev
```

- Backend uses nodemon (port 8081 by default)
- Frontend runs on port 3000 (CRA dev server)

API base URL in the frontend: `http://localhost:8081/api` (see `src/services/api.js`).

## Build & Run (production)

Build the frontend and start the Node server which serves the static build and API endpoints:

```bash
npm run start-prod
```

This runs the frontend build in `qa_frontend/college-qa-frontend/build` and starts `node server.js`.

## API endpoints

- GET `/api/questions` — list questions
- POST `/api/questions` — create a question
- GET `/api/questions/:id` — get details for a question
- GET `/api/answers/question/:questionId` — list answers for a question
- POST `/api/answers` — create an answer
- PATCH `/api/answers/helpful/:answerId` — mark helpful
- PATCH `/api/answers/verify/:answerId` — verify an answer

(Refer to `routes/` for implementation details.)

## Submodules

The frontend is included as a nested Git repository at `qa_frontend/college-qa-frontend` (kept as a submodule). To clone and initialize submodules:

```bash
# clone with submodules
git clone --recurse-submodules https://github.com/shravani-nutan/anonymus_qa.git
# or, after a normal clone, initialize submodules
git submodule update --init --recursive
```

To update the submodule to the latest commit on its remote:

```bash
git submodule update --remote --merge
```

## Contributing

Contributions are welcome. Suggested flow:

1. Fork the repo
2. Create a branch for your feature/fix
3. Submit a PR with tests and clear description

## License

MIT


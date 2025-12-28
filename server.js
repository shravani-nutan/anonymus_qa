const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');

const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');

const app = express();
const PORT = process.env.PORT || 8081;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionsRouter);
app.use('/api/answers', answersRouter);

// Health check (API)
app.get('/api/health', (req, res) => {
  res.json({ message: 'College Q&A Platform API is running!' });
});

// Serve React static build if it exists (so frontend + backend run on single server)
const buildPath = path.join(__dirname, 'qa_frontend', 'college-qa-frontend', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  // For any non-API route, serve index.html (client-side routing)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

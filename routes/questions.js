const express = require('express');
const router = express.Router();
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Create a new question
router.post('/', async (req, res) => {
  const { title, content, student_name, student_email, category, priority, status } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  try {
    const db = getDB();
    const result = await db.collection('questions').insertOne({
      title, content, student_name, student_email, category, priority: priority || 'MEDIUM',
      status: status || 'PENDING',
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const questions = await db.collection('questions').find().sort({ created_at: -1 }).toArray();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single question by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    const question = await db.collection('questions').findOne({ _id: new ObjectId(req.params.id) });
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

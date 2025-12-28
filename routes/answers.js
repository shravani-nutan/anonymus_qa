const express = require('express');
const router = express.Router();
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Add a new answer
router.post('/', async (req, res) => {
  const { question_id, content, expert_name, expert_email, expert_title } = req.body;

  if (!question_id || !content) {
    return res.status(400).json({ error: "question_id and content are required" });
  }

  try {
    const db = getDB();
    const result = await db.collection('answers').insertOne({
      question_id: new ObjectId(question_id),
      content,
      expert_name,
      expert_email,
      expert_title,
      helpful_count: 0,
      is_verified: false,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all answers for a question
router.get('/question/:id', async (req, res) => {
  try {
    const db = getDB();
    const answers = await db.collection('answers')
      .find({ question_id: new ObjectId(req.params.id) })
      .sort({ created_at: 1 })
      .toArray();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Increment helpful count
router.patch('/helpful/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('answers').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $inc: { helpful_count: 1 }, $set: { updated_at: new Date() } },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: "Answer not found" });
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify answer
router.patch('/verify/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('answers').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { is_verified: true, updated_at: new Date() } },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: "Answer not found" });
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

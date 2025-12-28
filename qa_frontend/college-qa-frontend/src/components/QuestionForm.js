import React, { useState } from 'react';
import { addQuestion } from '../services/api';
import './QuestionForm.css';

const QuestionForm = ({ onAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content required");
    await addQuestion({ title, content });
    setTitle('');
    setContent('');
    onAdded(); // refresh list
  };

  return (
    <form className="question-form card" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required
      />
      <br />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        required
      />
      <br />
      <button type="submit" className="btn">Add Question</button>
    </form>
  );
};

export default QuestionForm;

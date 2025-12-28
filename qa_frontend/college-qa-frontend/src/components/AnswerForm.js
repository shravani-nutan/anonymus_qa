import React, { useState } from 'react';
import { addAnswer } from '../services/api';

const AnswerForm = ({ questionId, onAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    await addAnswer({ question_id: questionId, content });
    setContent('');
    onAdded(); // refresh answers
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <textarea 
        placeholder="Your Answer" 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        required
      />
      <br />
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default AnswerForm;

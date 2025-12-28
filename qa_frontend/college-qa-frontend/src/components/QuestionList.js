import React, { useEffect, useState } from 'react';
import { getQuestions } from '../services/api';
import QuestionDetail from './QuestionDetail';

import './QuestionList.css';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="question-list">
      {selectedQuestion ? (
        <QuestionDetail 
          question={selectedQuestion} 
          onBack={() => setSelectedQuestion(null)} 
        />
      ) : (
        <>
          <h2>Questions</h2>
          <ul>
            {questions.map(q => (
              <li key={q._id} style={{ cursor: 'pointer' }} onClick={() => setSelectedQuestion(q)}>
                <strong>{q.title}</strong> - {q.status}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default QuestionList;

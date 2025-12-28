import React, { useEffect, useState } from 'react';
import { getAnswersByQuestion, markHelpful, verifyAnswer } from '../services/api';
import AnswerForm from './AnswerForm';
import './QuestionDetail.css';
const QuestionDetail = ({ question, onBack }) => {
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const data = await getAnswersByQuestion(question._id);
    setAnswers(data);
  };

  useEffect(() => {
    fetchAnswers();
  }, [question]);

  const handleHelpful = async (id) => {
    await markHelpful(id);
    fetchAnswers();
  };

  const handleVerify = async (id) => {
    await verifyAnswer(id);
    fetchAnswers();
  };

  return (
    <div className="question-detail card">
      <button className="btn secondary" onClick={onBack}>Back to Questions</button>
      <h2>{question.title}</h2>
      <p>{question.content}</p>

      <h3>Answers</h3>
      {answers.length === 0 ? <p>No answers yet.</p> : (
        <ul className="answer-list">
          {answers.map(a => (
            <li key={a._id}>
              {a.content} 
              <br />
              Helpful: {a.helpful_count} 
              <button onClick={() => handleHelpful(a._id)}>Helpful</button>
              {!a.is_verified && <button onClick={() => handleVerify(a._id)}>Verify</button>}
              {a.is_verified && <span>✔ Verified</span>}
            </li>
          ))}
        </ul>
      )}

      <AnswerForm questionId={question._id} onAdded={fetchAnswers} />
    </div>
  );
};

export default QuestionDetail;

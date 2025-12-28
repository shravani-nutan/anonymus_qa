import axios from 'axios';

const API = "http://localhost:8081/api";

export const getQuestions = async () => {
  const res = await axios.get(`${API}/questions`);
  return res.data;
};

export const addQuestion = async (question) => {
  const res = await axios.post(`${API}/questions`, question);
  return res.data;
};

export const getQuestionById = async (id) => {
  const res = await axios.get(`${API}/questions/${id}`);
  return res.data;
};

export const getAnswersByQuestion = async (questionId) => {
  const res = await axios.get(`${API}/answers/question/${questionId}`);
  return res.data;
};

export const addAnswer = async (answer) => {
  const res = await axios.post(`${API}/answers`, answer);
  return res.data;
};

export const markHelpful = async (answerId) => {
  const res = await axios.patch(`${API}/answers/helpful/${answerId}`);
  return res.data;
};

export const verifyAnswer = async (answerId) => {
  const res = await axios.patch(`${API}/answers/verify/${answerId}`);
  return res.data;
};

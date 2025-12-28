import React from 'react';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';

function App() {
  const [refresh, setRefresh] = React.useState(false);

  const handleAdded = () => setRefresh(!refresh);

  return (
    <div className="App container">
      <h1>College Q&A Platform</h1>
      <QuestionForm onAdded={handleAdded} />
      <QuestionList key={refresh} />
    </div>
  );
}

export default App;

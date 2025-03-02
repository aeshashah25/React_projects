import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [optionClicked, setOptionClicked] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('https://the-trivia-api.com/v2/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
    setOptionClicked(true);
  };

  const handleFlagQuestion = (questionId) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId)); //  effectively removing the flag.
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]); // Flag the question
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOptionClicked(false);
    } else {
      calculateScore();
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setOptionClicked(false);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions([]);
    setOptionClicked(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (questions.length === 0) return <div className="loading">Loading...</div>;

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <h2 className="question-number">Quiz Completed!</h2>
        <p className="result-text">You attempted {Object.keys(selectedAnswers).length} out of {questions.length} questions.</p>
        <p className="result-text">Your Score: {score}/{questions.length}</p>
        <h3>Your Answers:</h3>
        <ul className="answers-list">
          {questions.map((question, index) => (
            <li key={index} className="answer-item">
              <strong>Q{index + 1}: {question.question.text}</strong>
              <br />
              Your Answer: {selectedAnswers[question.id] || 'Not Answered'}
              <br />
              Correct Answer: {question.correctAnswer}
            </li>
          ))}
        </ul>
        <h3>Flagged Questions:</h3>
        <ul className="flagged-list">
          {flaggedQuestions.map((id, index) => {
            const question = questions.find(q => q.id === id);
            return (
              <li key={index} className="flagged-item">
                <strong>Q{index + 1}: {question.question.text}</strong>
              </li>
            );
          })}
        </ul>
        <button className="reset-button" onClick={handleResetQuiz}>Restart Quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];

  return (
    <div className="quiz-container">
      <h2 className="question-number">Question {currentQuestionIndex + 1}/{questions.length}</h2>
      <p className="question-text">{currentQuestion.question.text}</p>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${option === selectedAnswers[currentQuestion.id] ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(currentQuestion.id, option)}
            disabled={optionClicked && option !== selectedAnswers[currentQuestion.id]}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="actions">
        <button
          className={`flag-button ${flaggedQuestions.includes(currentQuestion.id) ? 'flagged' : ''}`}
          onClick={() => handleFlagQuestion(currentQuestion.id)}
        >
          {flaggedQuestions.includes(currentQuestion.id) ? 'Unflag' : 'Flag'}
        </button>
        <button className="previous-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
        <button className="next-button" onClick={handleNextQuestion}>Next</button>
      </div>
    </div>
  );
}

export default Quiz;

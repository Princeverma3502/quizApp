import React from 'react'

export default function Result({ questions, score, onRestart }) {
  const total = questions.length
  const incorrect = total - score

  return (
    <main className="result center">
      <h2>Quiz Results</h2>
      <ul className="summary">
        <li>Total questions: <strong>{total}</strong></li>
        <li>Correct: <strong>{score}</strong></li>
        <li>Incorrect: <strong>{incorrect}</strong></li>
        <li>Score: <strong>{Math.round((score / total) * 100)}%</strong></li>
      </ul>
      <div className="controls">
        <button className="primary" onClick={onRestart}>Restart Quiz</button>
      </div>
    </main>
  )
}

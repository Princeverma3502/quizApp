import React, { useState } from 'react'
import Quiz from './components/Quiz'
import Result from './components/Result'
import defaultQuestions from './data/questions'

export default function App() {
  const [started, setStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const [questions] = useState(() => {
    try {
      const raw = localStorage.getItem('quiz_questions')
      return raw ? JSON.parse(raw) : defaultQuestions
    } catch (e) {
      return defaultQuestions
    }
  })

  function handleFinish(finalScore) {
    setScore(finalScore)
    setShowResult(true)
  }

  function handleRestart() {
    setShowResult(false)
    setStarted(false)
    setScore(0)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Quiz App</h1>
      </header>

      {!started && !showResult && (
        <main className="center">
          <p>Ready to start the quiz? Click Start to load the quiz questions.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',alignItems:'center'}}>
            <button className="primary" onClick={()=>setStarted(true)} disabled={questions.length===0}>Start Quiz</button>
          </div>
        </main>
      )}

      {started && !showResult && (
        <Quiz questions={questions} onFinish={handleFinish} />
      )}

      {showResult && (
        <Result questions={questions} score={score} onRestart={handleRestart} />
      )}
    </div>
  )
}

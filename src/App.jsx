import React, { useState } from 'react'
import Quiz from './components/Quiz'
import defaultQuestions from './data/questions'

export default function App() {
  const [started, setStarted] = useState(false)
  const [questions] = useState(() => {
    try {
      const raw = localStorage.getItem('quiz_questions')
      return raw ? JSON.parse(raw) : defaultQuestions
    } catch (e) {
      return defaultQuestions
    }
  })

  return (
    <div className="app-container">
      <header>
        <h1>Quiz App</h1>
      </header>

      {!started && (
        <main className="center">
          <p>Ready to start the quiz? Click Start to load the quiz questions.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',alignItems:'center'}}>
            <button className="primary" onClick={()=>setStarted(true)} disabled={questions.length===0}>Start Quiz</button>
          </div>
        </main>
      )}

      {started && (
        <Quiz questions={questions} onFinish={() => { /* no-op for F01 */ }} />
      )}
    </div>
  )
}

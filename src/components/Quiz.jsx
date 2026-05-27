import React, { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Quiz({ questions, onFinish }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const scoreRef = useRef(0)

  const q = questions[index]
  const choiceRefs = useRef([])

  function choose(i) {
    if (showFeedback) return // prevent changing answer after selection
    setSelected(i)
    setShowFeedback(true)
    const correct = i === q.correctIndex
    if (correct) {
      // update both state and ref so we can reliably report final score
      setScore(s => {
        const next = s + 1
        scoreRef.current = next
        return next
      })
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.2 } })
    } else {
      // ensure ref stays in sync with state
      scoreRef.current = score
    }
  }

  function next() {
    setSelected(null)
    setShowFeedback(false)
    if (index + 1 < questions.length) {
      setIndex(index + 1)
    } else {
      onFinish(scoreRef.current)
    }
  }

  function onKeyChoice(e, i) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(i)
    }
  }

  useEffect(() => {
    // When a new question loads, focus the first choice so keyboard users can answer immediately.
    if (!showFeedback) {
      const el = choiceRefs.current[0]
      if (el && typeof el.focus === 'function') el.focus()
    }
  }, [index, showFeedback])

  return (
    <main className="quiz">
      <div className="question-header">
        <h2>Question {index + 1} of {questions.length}</h2>
      </div>
      <div className="progress" aria-hidden>
        <div className="progress-bar" style={{width: `${Math.round(((index) / questions.length) * 100)}%`}} />
      </div>
      <div className="question-text">{q.text}</div>

      <div className="choices" role="list" aria-label={`Choices (${q.choices.length})`}>
        <div className="choices-count">Choices: {q.choices.length}</div>
        {q.choices.map((c, i) => {
          const isSelected = selected === i
          const isCorrect = q.correctIndex === i
          let className = 'choice'
          if (showFeedback) {
            if (isCorrect) className += ' correct'
            else if (isSelected && !isCorrect) className += ' wrong'
            else className += ' disabled'
          }
          return (
            <div role="listitem" key={i}>
              <button
                className={className}
                onClick={() => choose(i)}
                onKeyDown={(e)=>onKeyChoice(e,i)}
                aria-pressed={isSelected}
                role="button"
                tabIndex={0}
                aria-label={`${c} — choice ${i + 1} of ${q.choices.length}`}
                ref={(el)=>{ choiceRefs.current[i]=el }}
              >
                {c}
              </button>
            </div>
          )
        })}
      </div>

      <div className="controls">
        {showFeedback ? (
          <button className="primary" onClick={next}>{index + 1 < questions.length ? 'Next' : 'Finish'}</button>
        ) : (
          <div className="hint">Select an answer to see feedback</div>
        )}
      </div>
    </main>
  )
}

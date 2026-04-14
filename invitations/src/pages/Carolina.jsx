import { useState, useEffect } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadConfettiPreset } from '@tsparticles/preset-confetti'
import Background from '../components/Background'
import QuizButton from '../components/QuizButton'
import './Carolina.css'

// ── Preguntas ─────────────────────────────────────────────────────────────────
// Cada pregunta tiene: question, options (array), answer (debe coincidir exacto con una opción)
const QUESTIONS = [
  {
    id: 1,
    question: '¿Trago favorito de Carolina?',
    options: ['Pisco Sour', 'Mojito', 'Aperol', 'Melón con vino'],
    answer: 'Aperol',
  },
  {
    id: 2,
    question: '¿Mascota favorita de Carolina?',
    options: ['🐶', '🐶 y 😺', '🐱', '🐰'],
    answer: '🐶 y 😺',
  },
  {
    id: 3,
    question: '¿Como se siente Carolina cuando llega el día de su cumpleaños?',
    options: ['Feliz, esperando el día', 'No quiero que llegue ese día', 'Emocionada, pero con algo de ansiedad', 'Indiferente, es un día más'],
    answer: 'No quiero que llegue ese día',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

const BURST_OPTIONS = {
  fullScreen: { enable: true, zIndex: 200 },
  preset: 'confetti',
  emitters: [
    {
      life: { count: 1, duration: 0.6 },
      rate: { quantity: 90, delay: 0 },
      position: { x: 50, y: 40 },
    },
  ],
}

const LOOP_OPTIONS = {
  fullScreen: { enable: true, zIndex: 50 },
  preset: 'confetti',
}

export default function Carolina() {
  const [engineReady, setEngineReady] = useState(false)
  const [step, setStep] = useState('start') // 'start' | 'quiz' | 'done'
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)       // opción clickeada actualmente
  const [wrongOption, setWrongOption] = useState(null) // opción marcada en rojo
  const [locked, setLocked] = useState(false)          // bloquea clicks durante animación
  const [burstKey, setBurstKey] = useState(0)
  const [showBurst, setShowBurst] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine)
    }).then(() => setEngineReady(true))
  }, [])

  const handleSelect = (option) => {
    if (locked) return
    const current = QUESTIONS[questionIndex]

    if (option === current.answer) {
      setSelected(option)
      setLocked(true)
      setBurstKey((k) => k + 1)
      setShowBurst(true)
      setTimeout(() => {
        setShowBurst(false)
        if (questionIndex + 1 >= QUESTIONS.length) {
          setStep('done')
        } else {
          setQuestionIndex((i) => i + 1)
          setSelected(null)
          setWrongOption(null)
          setLocked(false)
        }
      }, 2200)
    } else {
      setWrongOption(option)
      setLocked(true)
      setTimeout(() => {
        setWrongOption(null)
        setLocked(false)
      }, 1200)
    }
  }

  // ── Pantalla de inicio ────────────────────────────────────────────────────
  if (step === 'start') {
    return (
      <Background>
        <div className="carolina-card">
          <p className="carolina-date">🎂 18 de abril · 21:00</p>
          <h1 className="carolina-title">¡Estás invitada,<br />Carolina!</h1>
          <p className="carolina-subtitle">
            Antes de revelar tu invitación, debes superar unas preguntas…
          </p>
          <QuizButton onClick={() => setStep('quiz')}>Aceptar el reto</QuizButton>
        </div>
      </Background>
    )
  }

  // ── Pantalla final ────────────────────────────────────────────────────────
  if (step === 'done') {
    return (
      <Background>
        {engineReady && <Particles id="confetti-loop" options={LOOP_OPTIONS} />}
        <div className="carolina-card carolina-done">
          {/* Reemplaza /invitation.png con la ruta real de tu imagen */}
          <img
            className="carolina-invitation-img"
            src="/invitation.jpeg"
            alt="Invitación"
          />
          <p className="carolina-floating-text">🎉 ¡Te espero el 18 de abril a las 21:00! 🎉</p>
        </div>
      </Background>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  const current = QUESTIONS[questionIndex]

  return (
    <Background>
      {engineReady && showBurst && (
        <Particles
          key={burstKey}
          id={`confetti-burst-${burstKey}`}
          options={BURST_OPTIONS}
        />
      )}

      <div className="carolina-card">
        <p className="carolina-progress">
          {questionIndex + 1} / {QUESTIONS.length}
        </p>

        <h2 className="carolina-question">{current.question}</h2>

        <div className="carolina-options">
          {current.options.map((option) => {
            let variant = 'option'
            if (option === selected) variant = 'option-correct'
            if (option === wrongOption) variant = 'option-wrong'
            return (
              <button
                key={option}
                className={`carolina-option carolina-option--${variant}`}
                onClick={() => handleSelect(option)}
                disabled={locked && option !== selected && option !== wrongOption}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className={`carolina-feedback${wrongOption ? ' carolina-feedback--visible' : ''}`}>
          ❌ Eso no es correcto, intenta de nuevo
        </div>
      </div>
    </Background>
  )
}

import { useState } from 'react'
import Background from '../components/Background'
import './Chispa.css'

// ── Animales ──────────────────────────────────────────────────────────────────
// Ajusta image (ruta en /public) y text a lo que quieras mostrar en cada caso
const ANIMALS = [
  { id: 'wolf', emoji: '🐺', label: 'Lobo', image: '/therian/lobo.jpg', text: '¡Auuuuu! 🐺 El lobo de la manada ya tiene fiesta — ¡te esperamos el 17 de abril a las 18:00!' },
  { id: 'fox', emoji: '🦊', label: 'Zorro', image: '/therian/zorro.jpg', text: '¡Ring ring! 🦊 El zorro más listo del bosque tiene una misión: aparecer el 17 de abril a las 18:00.' },
  { id: 'lion', emoji: '🦁', label: 'León', image: '/therian/leon.jpg', text: '¡ROAAAR! 🦁 El rey de la sabana no puede faltar — ¡que empiece la fiesta el 17 de abril a las 18:00!' },
  { id: 'leopard', emoji: '🐆', label: 'Leopardo', image: '/therian/leopardo.jpg', text: '¡Hssss! 🐆 El leopardo llega sigiloso pero llega — cita el 17 de abril a las 18:00, sin excusas.' },
  { id: 'burger', emoji: '🍔', label: 'Hamburguesa', image: '/therian/queque.jpg', text: 'Luis Advincula... Quiero queque, ¿Que carajos?' },
  { id: 'bear', emoji: '🐻', label: 'Oso', image: '/therian/oso.jpg', text: '¡Grrrr! 🐻 El oso sale de su cueva especialmente para esto — ¡te esperamos el 17 de abril a las 18:00!' },
  { id: 'peak', emoji: '🐐', label: 'Peak', image: '/therian/peak.jpg', text: '¡Que hambre! 🍔 Te espero para comer el 17 de abril a las 18:00.' },
  { id: 'cat', emoji: '🐱', label: 'Gato', image: '/therian/gato.jpg', text: '¡Mrrrow! 🐱 El gato decidió honrarnos con su presencia — aparece el 17 de abril a las 18:00 (si tienes ganas, claro).' },
]
// ─────────────────────────────────────────────────────────────────────────────

export default function Chispa() {
  const [selected, setSelected] = useState(null)

  const animal = ANIMALS.find((a) => a.id === selected)

  return (
    <Background theme="forest">
      <div className="chispa-card">
        {selected ? (
          <div className="chispa-result">
            <p className="chispa-floating-title">🎂 Cumpleaños Therian 🎂</p>
            <img
              className="chispa-result-img"
              src={animal.image}
              alt={animal.label}
            />
            <p className="chispa-result-text">{animal.text}</p>
            <p className="chispa-floating-text">🎉 ¡Te espero el 17 de abril a las 18:00! 🎉</p>
            <p className="chispa-clarification">Te esperamos como un therian más 🐾</p>
            <button
              className="chispa-back-btn"
              onClick={() => setSelected(null)}
            >
              ← Volver a elegir
            </button>
          </div>
        ) : (
          <>
            <p className="chispa-floating-title">🎂 Cumpleaños Therian 🎂</p>
            <p className="chispa-subtitle">¿Que therian te sientes hoy?</p>
            <div className="chispa-grid">
              {ANIMALS.map((a) => (
                <button
                  key={a.id}
                  className="chispa-animal-btn"
                  onClick={() => setSelected(a.id)}
                >
                  <span className="chispa-animal-emoji">{a.emoji}</span>
                  <span className="chispa-animal-label">{a.label}</span>
                </button>
              ))}
            </div>
            <p className="chispa-clarification">Te esperamos como un therian más 🐾</p>
          </>
        )}
      </div>
    </Background>
  )
}


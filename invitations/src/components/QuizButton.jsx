import PropTypes from 'prop-types'
import './QuizButton.css'

export default function QuizButton({ children, onClick, variant = 'default', disabled }) {
  return (
    <button
      className={`quiz-button quiz-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

QuizButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'correct', 'wrong']),
  disabled: PropTypes.bool,
}

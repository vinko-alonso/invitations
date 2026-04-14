import PropTypes from 'prop-types'
import './Background.css'

export default function Background({ children, theme = 'blue' }) {
  return <div className={`background background--${theme}`}>{children}</div>
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['blue', 'forest']),
}

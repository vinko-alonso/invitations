import PropTypes from 'prop-types'
import './Background.css'

export default function Background({ children }) {
  return <div className="background">{children}</div>
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
}

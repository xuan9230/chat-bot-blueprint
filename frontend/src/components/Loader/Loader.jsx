import PropTypes from "prop-types"
import React from "react"

import "./loader.scss"

const Loader = ({ message }) => (
  <div className="loader-container">
    <h3 className="subtitle dark dark-text">{message}</h3>
    <div className="loader"></div>
  </div>
)

Loader.propTypes = {
  message: PropTypes.string,
}

Loader.defaultProps = {
  message: "Loading...",
}

export default Loader

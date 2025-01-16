import PropTypes from "prop-types"
import React from "react"

import "./UserChat.scss"

export const UserChat = ({ className = "", text }) => {
  const isPhoto = text === "[image]"

  return (
    <div className="flex flex-row chat user-chat">
      <div className={`text-wrapper ${className}`}>
        {isPhoto ? <img src={""} alt="placeholder" style={{ width: "100%" }} /> : <p className="text">{text}</p>}
      </div>
      <div className="flex ml-sm h-[32px] w-[32px] bg-[#404048] self-center justify-content-center text-white font-sans text-lg rounded-[50%]">J</div>
    </div>
  )
}

UserChat.propTypes = {
  text: PropTypes.string,
}

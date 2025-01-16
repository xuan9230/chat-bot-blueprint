import React from "react"
import speechBubble from "../../../assets/ChatScreen/speechBubble.svg"

export const ChatHeader = () => {
  return (
      <div className="flex flex-row px-md py-lg font-sans font-semibold text-primaryBlue text-xl text-white">
        <img className="mr-sm" src={speechBubble} alt="chat" />
        Chat
      </div>
  )
}

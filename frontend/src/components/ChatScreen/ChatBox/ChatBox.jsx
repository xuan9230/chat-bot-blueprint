import { ReactComponent as Chat } from "../../../assets/ChatScreen/chat.svg"
import "./ChatBox.scss"

export const ChatBox = ({ onChange, input, onKeyUp }) => {

  return (
    <div className="chat-box">
      <Chat />
      <input
        className="type-here"
        placeholder="e.g., change retirement age"
        value={input}
        onChange={(event) => onChange(event.target.value)}
        onKeyUp={onKeyUp}
      />
    </div>
  )
}

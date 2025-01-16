import { LoaderDots } from "@thumbtack/thumbprint-react"
import React, { useCallback, useEffect, useRef, useState } from "react"

import getChatResponse from "../../api/chat"
import { AIChat } from "../../components/ChatScreen/AIChat"
import { ChatBox } from "../../components/ChatScreen/ChatBox"
import { ChatHeader } from "../../components/ChatScreen/ChatHeader"
import { UserChat } from "../../components/ChatScreen/UserChat"
import { useAppContext } from "../../context/AppContext"
import "./ChatScreen.scss"

const botWelcomeResponseAuth = {
  message: `Hi! I am here to chat and help. I'll need to first gather some basic information from you. It seems you've linked your account. Is that correct?`,
}

const botWelcomeResponseNonAuth = {
  message: `Hi! I am here to chat and help. To get started, can I first gather some basic information from you?`,
}

// const sampleFinalResponse = {
//   attributes:
//     '{\n"attributes":{\n"name": "James",\n"contact_number": "0412345678",\n"super_fund": "Australian Retirement Trust",\n"age": 32,\n"retirement_age": 67\n},\n"recommendation": "Based on the information given, you have 35 years until your retirement. It is crucial to ensure you have enough funds for your post-retirement years. I\'d suggest consistently contributing a specific amount to your superannuation fund. Additionally, take advantage of the compound interest that builds over time. Make sure to invest wisely and consider diversifying your investment to reduce risk. For further tailored advice, more personal finance information would be needed."\n}',
//   message:
//     "Based on the information given, you have 35 years until your retirement. It is crucial to ensure you have enough funds for your post-retirement years. I'd suggest consistently contributing a specific amount to your superannuation fund. Additionally, take advantage of the compound interest that builds over time. Make sure to invest wisely and consider diversifying your investment to reduce risk. For further tailored advice, more personal finance information would be needed.",
// }

// Replace the bot welcome response in line 42 with this to see the product recommendation
// const sampleProductResponse = {
//   message: `Here are some products you might be interested in:`,
//   product_recommendation: [
//     {
//       name: "Marquee 7 Piece Steel Sling Back Outdoor Setting",
//       image:
//         "https://media.prod.bunnings.com.au/api/public/content/19757a5b06624b768b6c0fa63bce2f18?v=33ed2d2d&t=w500dpr2",
//       original_price: "289",
//       price: "249",
//     },
//     {
//       name: "Lytworx 195cm Christmas Tree",
//       image:
//         "https://media.prod.bunnings.com.au/api/public/content/f18c0f538e724ca8a63bc118042ee363?v=382dddca&t=w500dpr2",
//       original_price: "129",
//       price: "99",
//     },
//   ],
// }

const botSignOutResponse = {
  message: `Please let us know if there's anything else you need help with?`,
}

const SESSION_DURATION = 120000

const ChatScreen = () => {
  const isAuthenticated = false

  const { setBasicInfo, setRec } = useAppContext()
  const [conversation, setConversation] = useState([
    { user: "", bot: isAuthenticated ? botWelcomeResponseAuth : botWelcomeResponseNonAuth },
  ])
  const [chatLoading, setChatLoading] = useState(false)
  const [input, setInput] = useState("")
  const [isSigningOut, setIsSigningOut] = useState(false)

  const messagesEndRef = useRef(null)
  const sessionRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }

  const resetSessionTimer = useCallback(() => {
    if (sessionRef.current) {
      clearTimeout(sessionRef.current)
    }
    if (!input) {
      sessionRef.current = setTimeout(() => {
        setConversation([...conversation, { user: null, bot: botSignOutResponse }])
        setIsSigningOut(true)
      }, SESSION_DURATION)
    }
  }, [conversation, input])

  useEffect(() => {
    const latestChat = conversation[conversation.length - 1]
    const isChatEnd = latestChat?.bot?.message?.includes("Stay You")

    if (!chatLoading && latestChat.user && latestChat.bot && !isChatEnd) {
      resetSessionTimer()
    }
  }, [input, conversation, chatLoading, resetSessionTimer])

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 250)
  }, [conversation])

  const handleSubmit = async (e, isPhoto) => {
    if ((isPhoto || (e.keyCode === 13 && input)) && !chatLoading) {
      const userInput = isPhoto ? "[image]" : input
      setInput("")

      setConversation([...conversation, { user: userInput, bot: null }])
      setChatLoading(true)
      let botChat = {}
      const botMessage = isSigningOut ? botSignOutResponse.message : ""
      const botResponse = (await getChatResponse(userInput, botMessage, true, isAuthenticated)) || {}

      if (botResponse.attributes) setBasicInfo(botResponse.attributes)

      if (botResponse.recommendations) setRec(botResponse.recommendations)

      botChat = {
        ...botResponse,
      }
      setChatLoading(false)

      const chats = conversation

      chats[chats.length] = {
        user: userInput,
        bot: botChat,
      }
      setConversation(chats)
    }
  }

  return (
    <div className="element-chat min-h-[400px] h-[600px]">
      <div className="chat-container h-full">
        <ChatHeader conversation={conversation} />
        <div className="conversation">
          {conversation.map((chat, index) => (
            <div className="conversation-box" key={`chat-${index}`}>
              {chat.user && <UserChat text={chat.user} />}
              {chat.bot && <AIChat content={chat.bot} />}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <div className="chat-box-container">
          {chatLoading && <div className="chat-loader">{<LoaderDots size="small" theme="muted" />}</div>}
          <ChatBox input={input} onChange={setInput} onKeyUp={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default ChatScreen

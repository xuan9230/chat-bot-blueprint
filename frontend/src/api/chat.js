import axios from "axios"

const getChatResponse = async (input, botMessage, isAuthenticated) => {
  let requestData
  if (botMessage) {
    requestData = {
      question: input,
      isAuthenticated,
      bot: botMessage,
    }
  } else {
    requestData = {
      question: input,
      isAuthenticated,
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/submit`, requestData)
    const responseData = response.data
    return responseData
  } catch (error) {
    console.error("Error:", error)
  }
}

export default getChatResponse

import axios from "axios"

const getVideoResponse = async (videoId) => {
  const requestData = {
    params: {
      id: videoId,
    },
    headers: {
      Accept: "video/mp4;charset=UTF-8",
    },
    responseType: "blob",
  }

  try {
    const response = await axios.get("/get_video", requestData)
    const URL = window.URL || window.webkitURL
    const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }))
    return url
  } catch (error) {
    console.error("Error:", error)
  }
}

export default getVideoResponse

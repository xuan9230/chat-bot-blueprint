import PropTypes from "prop-types"
import React from "react"

import advisorImg from "../../../assets/ChatScreen/advisor.svg"
import { Product } from "../Product"
import { VideoPlayer } from "../VideoPlayer/VideoPlayer"
import "./AIChat.scss"

export const AIChat = ({ className, content }) => {
  let products = []

  if (content.products) {
    const bodyString = content.products.split("json")[1]
    products = JSON.parse(bodyString)
  }

  const isProductRecommendationDisplayed = !!products.length > 0
  const isVideoDisplayed = !!content?.video_list?.length > 0
  const isMessageDisplay = content?.message || content?.image_list?.length > 0 || content?.link

  return (
    <>
      {isMessageDisplay && (
        <div className={`chat advisor-chat ${className}`}>
          <div className="content-wrapper">
            <p className="content">{content?.message}</p>
            {content?.link && (
              <a href={content.link} target="_blank" rel="noopener noreferrer" className="content">
                Link with further info
              </a>
            )}
            {content?.image && <img src={content.image} alt="product" className="product-image" />}
          </div>
        </div>
      )}
      {isProductRecommendationDisplayed && (
        <div className="product-recommendation mt-2">
          {products.map((product) => (
            <Product product={product} />
          ))}
        </div>
      )}
      {isVideoDisplayed && <VideoPlayer videoId={content?.video_list[0]} />}
      <img className="advisor-icon" alt="Character" src={advisorImg} />
    </>
  )
}

AIChat.propTypes = {
  text: PropTypes.string,
}

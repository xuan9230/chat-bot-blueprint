import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"

import getVideoResponse from "../../../api/video"
import "./VideoPlayer.scss"

export const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  const fetchVideo = useCallback(async () => {
    const response = await getVideoResponse(videoId)
    setVideoUrl(response)
  }, [setVideoUrl, videoId]);

  useEffect(() => {
    fetchVideo()
  }, [videoId, fetchVideo]);

  return (
    <div className={`chat video-container`}>
      <div className="content-wrapper">
        {videoUrl && (
          <video className="video" controls autoPlay loop muted>
            <source src={videoUrl} type="video/mp4"></source>
          </video>
        )}
      </div>
    </div>
  )
}

VideoPlayer.propTypes = {
  videoId: PropTypes.string,
}

import React, { useEffect } from "react"

import { ReactComponent as Arrows } from "../../assets/Recommendations/arrows.svg"
import { RecommendationsBanner } from "../../components/RecommendationsBanner/RecommendationsBanner"
import { Tag } from "../../components/Tag/Tag"
import { useAppContext } from "../../context/AppContext"

export default function Recommendation() {
  const { rec } = useAppContext()
  const ref = "recommendations"

  useEffect(() => {
    if (rec?.length > 0) {
      document.getElementById(ref)?.scrollIntoView(true)
    }
  }, [rec])

  return (
    <div className="p-sm bg-white h-full">
      {rec?.length > 0 ? (
        <div id={ref} style={{ scrollMarginTop: "10px", scrollBehavior: "smooth" }}>
          <RecommendationsBanner text="Recommendations for you" />
          <div className="mt-xl font-sans font-bold text-2xl">Optimise your super with additional contributions</div>
          <div className="flex flex-wrap lg:flex-nowrap gap-md py-lg">
            {rec.map((r, i) => {
              return (
                <div
                  key={r.title}
                  className="flex flex-col p-md gap-md w-full lg:min-h-[300px] lg:w-[370px] rounded-md border shadow-sm">
                  <div
                    className="flex flex-row flex-start items-center gap-sm text-xl font-semibold"
                    style={{ color: i === 0 ? "#2E7D32" : "#2962FF" }}>
                    <Arrows style={{ fill: i === 0 ? "#2E7D32" : "#2962FF" }} />
                    Option {i + 1}
                    <Tag
                      text={i === 0 ? "Highly recommended" : "Recommended"}
                      color={i === 0 ? "#2E7D32" : "#2962FF"}
                    />
                  </div>
                  <div className="text-xl font-semibold">{r.title}</div>
                  <div className="text-md">{r.impact}</div>
                  <button className="flex bg-primaryBlue text-white rounded-md w-fit py-sm px-md place-self-end">
                    see more
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <RecommendationsBanner text="Chat with us to get some personalised advice" />
        </div>
      )}
    </div>
  )
}

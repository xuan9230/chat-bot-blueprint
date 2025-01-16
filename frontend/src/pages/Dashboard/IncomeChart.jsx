import React, { useCallback, useEffect, useState } from "react"
import Plot from "react-plotly.js"

import { useAppContext } from "../../context/AppContext"
import { getChartData } from "../../utils/income"

export default function IncomeChart() {
  const { basicInfo, setBasicInfo } = useAppContext()
  const [result, setResult] = useState({})

  const updateResult = useCallback(() => {
    const update = getChartData({ basicInfo, setBasicInfo })

    if (update) setResult(update)
  }, [basicInfo, setBasicInfo])

  useEffect(() => {
    updateResult()
  }, [updateResult, basicInfo])

  const layout = {
    margin: { t: 0, r: 40, b: 40, l: 60 },
    autosize: true,
    height: 300,
    plot_bgcolor: "transparent",
    paper_bgcolor: "transparent",
    colorway: ["#2962FF", "#BBDEFB"],
    xaxis: { title: "Your age" },
    yaxis: { title: "Your super balance" },
    legend: { x: 0.55, y: 1.1, orientation: "h" },
    barmode: "relative",
    bargap: 0.3,
    annotations: basicInfo?.total_super && [
      {
        x: basicInfo?.retirement_age,
        y: basicInfo?.total_super,
        text: `Total super at ${basicInfo?.retirement_age} years old: $${basicInfo?.total_super?.toLocaleString()}`,
        arrowhead: 0,
        ax: 0,
        ay: -30,
      },
    ],
  }

  const data = [
    // {
    //   x: result.x,
    //   y:  result.income,
    //   name: 'Income from your super',
    //   type: 'bar'
    // },
    {
      x: result.x,
      y: result.balance,
      name: "Your super balance",
      type: "bar",
    },
  ]

  return result?.balance ?
    (
      <div className="flex flex-col gap-md flex-grow w-[80%] h-full">
        <div className="font-sans text-xl font-extrabold">Your superannuation plan</div>
        <Plot data={data} layout={layout} config={{ displayModeBar: false, responsive: true }} />
      </div>
    )
    :
    null;
}

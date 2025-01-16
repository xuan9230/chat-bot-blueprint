import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import React from "react"

import { useAppContext } from "../../context/AppContext"

export default function BasicInfo() {
  const { basicInfo } = useAppContext()

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  const infoOrder = ["name", "age"]

  const accordionProps = {
    sx: {
      "&:before": {
        display: "none",
      },
    },
    style: { color: "white", backgroundColor: "#404048", border: "none", boxShadow: "none" },
  }

  return (
    <div className="p-md flex-grow text-white bg-[#404048] overflow-auto">
      <div className="flex flex-row justify-between items-center mb-lg">
        <div className="font-semibold text-2xl">About you</div>
        <button
          className="flex text-white self-end rounded-md w-fit py-sm px-md"
          style={{ border: "1px solid" }}
          onClick={() => {
            localStorage.setItem("isAuthenticated", !isAuthenticated)
            const currentUrl = window.location.href
            window.open(currentUrl, "_blank") // Opens the current URL in a new tab
            window.close() // Closes the current tab
          }}>
          Log {isAuthenticated ? "out" : "in"}
        </button>
      </div>

      <Accordion {...accordionProps} defaultExpanded={isAuthenticated && !!basicInfo.name}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>Your Information</AccordionSummary>
        <AccordionDetails>
          {basicInfo &&
            infoOrder.map((key) => (
              <div key={key + basicInfo[key]} className="flex justify-between py-1">
                <span className="flex font-sans flex-nowrap capitalize text-[14px]">{key.replace("_", " ")}:</span>
                <span className="font-sans text-[14px]">{basicInfo[key] ?? "-"}</span>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>

      <Accordion {...accordionProps}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>
          Account preferences
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>

      {/* <Accordion {...accordionProps}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>Goals</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion> */}
    </div>
  )
}

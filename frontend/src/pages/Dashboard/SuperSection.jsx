import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import Arrow from "../../assets/DashboardScreen/descendentArrow.svg";

export default function SuperSection() {
  const { basicInfo } = useAppContext();
  const [retirementAnnualIncome, setRetirementAnnualIncome] = useState();
  const [totalSuperBalance, setTotalSuperBalance] = useState();

  useEffect(() => {
    setRetirementAnnualIncome(basicInfo?.retirement_income);
    setTotalSuperBalance(basicInfo?.total_super);
  }, [basicInfo])

  if (!basicInfo?.retirement_income || !basicInfo?.total_super) return null;

  return (
    <div className="flex flex-col gap-sm max-w-[25%]">
      <div className="bg-[#FF1744] text-white rounded-xl shadow-sm p-md">
        <div className="font-sans text-md font-bold">Super Score</div>
        <div className="flex flex-row font-sans text-xl font-semibold">
          <img src={Arrow} alt="reduction"/>
          Low rating
        </div>
        <p className="font-sans text-xs">
          in accordance with the{" "}
          <a href="/" className="underline">
            ASFA Retirement Standard
          </a>
        </p>
      </div>
      <div>
        <div className="font-sans text-2xl font-bold">${retirementAnnualIncome.toLocaleString()}</div>
        <div className="font-sans text-xs mb-md">Your estimated annual income for retirement</div>
        <div className="font-sans text-lg font-bold">${totalSuperBalance.toLocaleString()}</div>
        <div className="font-sans text-xs mb-md">Your estimated super balance at the age of retirement</div>
      </div>
    </div>
  )
}

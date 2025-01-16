import { useAppContext } from "../../context/AppContext"
import Tendency from "../../assets/DashboardScreen/tendency.svg"
import Increase from "../../assets/DashboardScreen/increase.svg"

/**
 * HighlightCard component to display the contribution details
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the contributions section.
 * @param {Array} props.data - The data to be displayed in the contributions section.
 * @param {function} props.onClick - The function to be called when an item is clicked.
 * @returns 
 */
function HighlightCard({ icon, title, cost, description }) {
  return (
    <div className="flex flex-row items-start gap-md">
      <img src={icon} alt="icon" />
      <div className="flex flex-col">
        <div>
          <div className="font-sans text-sm font-semibold">{title}</div>
          <div className="font-sans text-primaryBlue text-xl font-semibold">${cost}</div>
          <div className="font-sans text-xs">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default function Contributions() {
  const { basicInfo } = useAppContext();

  if (!basicInfo?.retirement_age || !basicInfo?.age) return null;

  const yearsDifference = basicInfo?.retirement_age - basicInfo?.age;
  const additionalContribution = 100;
  const superIncrease = 52 * yearsDifference * additionalContribution;
  const taxSavings = superIncrease * 0.15 / yearsDifference;

  return (
    <div className="flex flex-col gap-sm w-full">
      <div className="font-sans text-xl font-bold">Potential non-concessional contributions</div>
      <div className="font-sans text-sm mb-md">By maintaining additional contributions of <b>${additionalContribution} per week</b>, by retirement you could achieve:</div>
      <div className="flex flex-row w-full justify-start gap-md">
        <HighlightCard
          icon={Tendency}
          title={"Maximise your super"}
          cost={superIncrease.toLocaleString()}
          description={"increase to your super balance until retirement age."}
        />
        <HighlightCard
          icon={Increase}
          title={"More tax savings"}
          cost={taxSavings.toLocaleString()}
          description={"per year in tax savings, up to retirement."}
        />
      </div>
    </div>
  )
}

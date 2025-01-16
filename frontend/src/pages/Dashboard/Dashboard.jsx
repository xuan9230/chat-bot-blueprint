import logo from "./super-logo.svg"
import IncomeChart from "./IncomeChart";
import SuperSection from "./SuperSection";
import Recommendation from "./Recommendation";
import Contributions from "./Contributions";

export default function Dashboard() {
  return (
    <div className="p-lg bg-white w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-sans text-[56px] text-primaryBlue font-bold">Super Ü</h1>
        <img src={logo} alt="Super Logo" />
      </div>

      <br />

      <div className="flex flex-row flex-grow p-md bg-white flex gap-lg justify-between">
        <IncomeChart />

        <SuperSection />
      </div>

      <div className="py-lg" />

      <Contributions />

      <div className="py-lg" />

      <Recommendation />
    </div>
  )
}

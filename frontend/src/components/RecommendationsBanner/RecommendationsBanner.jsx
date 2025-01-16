import { ReactComponent as Banner } from '../../assets/Recommendations/banner.svg';

export function RecommendationsBanner({text}) {
  return (
    <div className="flex flex-row justify-center text-white rounded-2xl overflow-hidden w-full border-xs shadow-md">
      <div className="flex justify-start bg-primaryBlue p-xl text-3xl w-full">{text}</div>
      <div className='flex py-md w-[30%] justify-center'>
        <Banner/>
      </div>
    </div>
  )
}

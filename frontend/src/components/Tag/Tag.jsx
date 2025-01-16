export function Tag({text, color}) {
  return (
    <div className={`flex px-md items-center text-md text-white rounded-xl`} style={{backgroundColor: color}}>
      {text}
    </div>
  )
}

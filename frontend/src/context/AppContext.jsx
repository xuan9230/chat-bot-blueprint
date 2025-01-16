import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}
export function AppContextProvider({ children }) {
  const [basicInfo, setBasicInfo] = useState({})
  const [rec, setRec] = useState()

  return (
    <AppContext.Provider
      value={{
        basicInfo,
        setBasicInfo,
        rec,
        setRec,
      }}>
      {children}
    </AppContext.Provider>
  )
}

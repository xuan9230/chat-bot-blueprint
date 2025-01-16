import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AppContextProvider } from "./context/AppContext"
import BasicInfo from "./pages/BasicInfo/BasicInfo"
import ChatScreen from "./pages/ChatScreen/ChatScreen"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export function Home() {
  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col w-[400px] shadow z-10">
        <BasicInfo />
        <ChatScreen />
      </div>
      <div className="w-full overflow-scroll m-lg">
        Dashboard
        {/*<Dashboard />*/}
      </div>
    </div>
  )
}

export default App

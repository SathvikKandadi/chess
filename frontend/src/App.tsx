import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./screens/LandingPage"
import GamePage from "./screens/GamePage"

function App() {



  return (
    <div className="h-screen bg-neutral-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/game" element={<GamePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

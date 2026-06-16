import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Why from "./pages/Why.jsx"
import Weapons from "./pages/Weapons.jsx"

function App(){
  return(
      <Router>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/why" element={<Why/>}/>
              <Route path="/weapons" element={<Weapons/>}/>
          </Routes>
      </Router>
  )
}
export default App
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from "./components/Signup"

function App() {

  return (
    <>
     
      <BrowserRouter> 
      <Navbar/>
        <Routes>
          <Route>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

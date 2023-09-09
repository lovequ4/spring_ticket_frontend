import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from "./components/Signup"
import MyTicket from "./components/MyTicket"
import Payment from "./components/Payment"

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
            <Route path="/myticket" element={<MyTicket/>} />
            <Route path="/payment" element={<Payment/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

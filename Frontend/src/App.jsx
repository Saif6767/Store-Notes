import Login from "./components/Login"
import Home from "./Home/Home"
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Signup from "./components/Signup";


function App() {
  
  return (
    <>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
     <Route
            path="/dashboard" element= {<Home />}  />
     </Routes>
     <Toaster />
    </>
  )
}

export default App

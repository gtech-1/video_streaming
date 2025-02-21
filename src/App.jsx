import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignIn from "./pages/Auth/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/home" element={ <Home />}/>
      </Routes>
    </BrowserRouter>
  )
  };




export default App;
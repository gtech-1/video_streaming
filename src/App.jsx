import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignIn from "./components/SignIn";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/dashboard" element={ <Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import Login from "./Admin/Login";
import Admin from "./Admin/Admin";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin/>} />
        <Route path="/admin/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App

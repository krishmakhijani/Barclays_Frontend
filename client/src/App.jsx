import './App.css'
import DashboardPage from './pages/Dasboard/dashboard';
import Login from './pages/login/LoginPage';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </Router>
  )
}

export default App

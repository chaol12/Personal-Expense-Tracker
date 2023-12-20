/* istanbul ignore file */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthContextProvider from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TransTable from './pages/TransTable';
// import DashboardCards from './pages/DashboardCards';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import RegisterSurvery from './pages/RegisterSurvey';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataVis from './pages/DataVisualization';

function App() {

  return (
    <AuthContextProvider>
    <div data-testid="app">
    <Router>
    <NavBar />
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/forget-password" element={<ForgetPassword/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/transtable" element={<TransTable/>} /> 
          <Route exact path="/data" element={<DataVis/>}/>
          <Route exact path="/profile" element={<Profile/>} />
          {/* <Route exact path="/dashboard-card" element={<DashboardCards/>} /> */}
          {/* the above line is redundant but we may utilize later for component-based building. Do not delete files associated. */}
          <Route exact path="/register-survey" element={<RegisterSurvery/>} />
          </Routes>
          <ToastContainer autoClose={4000} />
    </Router>
    </div>
    </AuthContextProvider>
  )
}

export default App

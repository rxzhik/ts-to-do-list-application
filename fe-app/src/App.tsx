import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import About from './pages/About';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar/>
      <div className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/logout" element={<LogOut/>}/>

          </Routes>
        </Router>
      </div>
      <Footer/>
    </>
  )
}

export default App

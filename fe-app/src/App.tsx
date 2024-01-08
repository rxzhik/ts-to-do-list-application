import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import About from './pages/About';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useEffect, useRef, useState } from 'react';
import { getCurrentUserId } from './data/userRepo';
import LogInModal from './components/LogInModal';
import RegisterModal from './components/RegisterModal';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const logInRef = useRef<HTMLDialogElement>(null);
  const registerRef = useRef<HTMLDialogElement>(null);

  useEffect(()=>{
    const currUserId = getCurrentUserId();
    if(currUserId === null || currUserId.id === ""){
      console.log("Setting is LoggedIn False")
      console.log(currUserId)

      setIsLoggedIn(false)
    }else{
      console.log("Setting is LoggedIn True")
      console.log(currUserId.id === "")

      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  const toggleLoginModal = () =>{
    if(!logInRef.current){
      console.log("logInRef.current is null")
      return;
    }
    logInRef.current.hasAttribute("open")
      ? logInRef.current.close()
      : logInRef.current.showModal();
    console.log("Ran toggle Login Modal")
  }


  const toggleRegisterModal = ()=>{
    if(!registerRef.current){
      console.log("registerRef.current is null")
      return;
    }
    registerRef.current.hasAttribute("open")
      ? registerRef.current.close()
      : registerRef.current.showModal();
    console.log("Ran toggle Register Modal")
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} toggleLoginModal={toggleLoginModal}
        toggleRegisterModal={toggleRegisterModal}/>
      
      <dialog className="LogIn-Modal" ref={logInRef}>
        <LogInModal setIsLoggedIn={setIsLoggedIn} toggleLoginModal={toggleLoginModal}/>
      </dialog>

      <dialog className="Register-Modal" ref={registerRef}>
        <RegisterModal setIsLoggedIn={setIsLoggedIn} toggleRegisterModal={toggleRegisterModal}/>
      </dialog>

      <div className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/about" element={<About/>}/>
            {/* <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn}/>}/> */}
            {/* <Route path="/logout" element={<LogOut/>}/> */}
            {/* <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>}/> */}
          </Routes>
        </Router>
      </div>
      <Footer/>
    </>
  )
}

export default App

import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import './NavBar.css'
import { NavDropdown } from 'react-bootstrap';
import { setCurrentUserId } from '../data/userRepo';
type NavBarProps = {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  toggleLoginModal: () => void,
  toggleRegisterModal: () => void
}

const NavBar = (props: NavBarProps) => {
  const {isLoggedIn, setIsLoggedIn, toggleLoginModal, toggleRegisterModal} = props;
  useEffect(()=>{
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return (
    <div className='navbar-section'>
        <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
        <Container >
            <Navbar.Brand style={{display: 'flex', alignItems: 'center', fontSize: '30px'}} href={isLoggedIn?"/":"/about"}>
                <img
                alt=""
                src={logo}
                className="d-inline-block align-top"
                style={{width: '10vw', height: 'auto'}}
                />{' '}
                <h1 style={{fontWeight: "bold", color: "black", display: "inline"}}>To Do List</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="" id="basic-navbar-nav">
            <Nav className="ms-auto" style={{fontSize: '20px'}}>
                {isLoggedIn ? (
                  <Nav.Link href="/">Tasks</Nav.Link>
                ): null}
                <Nav.Link href="/about">About</Nav.Link>
                {
                  isLoggedIn ? (
                    <>  
                      <NavDropdown title={<span className="material-symbols-outlined">account_circle</span>} 
                      id="basic-nav-dropdown">
                        <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                        <NavDropdown.Item href="/about" onClick={()=>{
                          setCurrentUserId('')
                          setIsLoggedIn(false)
                        }}>Log Out</NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ):(
                    <>
                      <Nav.Link href="#" onClick={toggleLoginModal} >Log In </Nav.Link>
                      <Nav.Link href="#" onClick={toggleRegisterModal}>Register</Nav.Link>
                    </>
                  )
                }
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
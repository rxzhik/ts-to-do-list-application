import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar-section'>
        <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
        <Container >
            <Navbar.Brand style={{display: 'flex', alignItems: 'center', fontSize: '30px'}} href="/">
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                style={{width: '4vw', height: 'auto'}}
                />{' '}
                <h1 style={{fontWeight: "bold", color: "black", display: "inline"}}>To Do List</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="" id="basic-navbar-nav">
            <Nav className="ms-auto" style={{fontSize: '20px'}}>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/account">Account</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/logout">Log Out</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
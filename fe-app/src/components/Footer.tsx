import React from 'react'
import { Container } from 'react-bootstrap'
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <div className="footer">
        <Container style={{color: "#fffff4"}}>
          <div className="logo-name-footer" style={{marginBottom: "2vh"}}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              style={{width: '3vw', height: 'auto'}}
            />
            <h1 style={{fontWeight: "bold"}}>To Do List</h1>
          </div>
          <h4>Copyright © Rashik Raj</h4>
          <h4 className="footer-links">
              <a href="/">Home</a>
              <span> | </span>
              <a href="/about">About</a>
              <span> | </span>
              <a href="/account">Account</a>
          </h4>
        </Container>
      </div>
  )
}

export default Footer
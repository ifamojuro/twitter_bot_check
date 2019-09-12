import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import "./boots.css"
import {StyledHlink} from './sc'

function Custom_Nav() {
  return(
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/" >Analyze.me</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><StyledHlink smooth to="/#home">Home</StyledHlink></Nav.Link>
      <Nav.Link><StyledHlink smooth to="/#faq-section">FAQs</StyledHlink></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  	)
}

export default Custom_Nav
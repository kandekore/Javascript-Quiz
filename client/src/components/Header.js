
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './css/Header.module.css';
import jslogo from '../images/logo192.png'

function Header() {
  return (
    <Navbar expand="lg" sticky="top" className={styles.header + ' bg-body-tertiary'}>
      <Container>
        <Navbar.Brand href="/"><img src={jslogo} className="jslogo" alt="MERN Stack"/> Quiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink + ' nav-link' : 'nav-link'}>Home</NavLink>
            <NavLink to="/high-scores" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>High Scores</NavLink>
            <NavLink to="/operators" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Reference</NavLink>
             </Nav>
          
        </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
}

export default Header;

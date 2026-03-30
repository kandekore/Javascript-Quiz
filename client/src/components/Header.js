import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from './css/Header.module.css';
import jslogo from '../images/logo192.png';

function Header() {
  return (
    <Navbar expand="lg" sticky="top" className={styles.header}>
      <Container>
        <Navbar.Brand href="/" className={styles.brand}>
          <img src={jslogo} className={styles.jslogo} alt="JavaScript" />
          <span className={styles.brandText}>JS<span className={styles.brandAccent}>Quiz</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.activeLink} nav-link` : `${styles.navLink} nav-link`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/high-scores"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.activeLink} nav-link` : `${styles.navLink} nav-link`
              }
            >
              High Scores
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;


import React from 'react';
// import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './css/Header.module.css';

function Header() {
  // const [searchQuery, setSearchQuery] = useState('');
  // const navigate = useNavigate();

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  //   setSearchQuery('');
  // };

  return (
    <Navbar expand="lg" sticky="top" className={styles.header + ' bg-body-tertiary'}>
      <Container>
        <Navbar.Brand href="/">JavaScript Concepts</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink + ' nav-link' : 'nav-link'}>Home</NavLink>
                        <NavLink to="/variables" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Variables</NavLink>
            <NavLink to="/data-types" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Data Types</NavLink>
            <NavLink to="/operators" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Operators</NavLink>
            <NavLink to="/control-flow" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Control Flow</NavLink>
            <NavLink to="/functions" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Functions</NavLink>
            <NavLink to="/scope" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Scope</NavLink>
            <NavLink to="/objects" className={({ isActive }) => isActive ? `${styles.activeLink} nav-link` : "nav-link"}>Objects</NavLink>
            <NavDropdown title="More" id="navbarScrollingDropdown">
                           <NavDropdown.Item as={Link} to="/objects" className="dropdown-item">
    Objects
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/array-methods" className="dropdown-item">
    Array Methods
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/array-iteration" className="dropdown-item">
    Array-Iteration
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/promises" className="dropdown-item">
    Promises
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/asynchronous-javascript" className="dropdown-item">
    Asynchronous JavaScript
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/error-handling" className="dropdown-item">
    Error Handling
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/json-javascript-object-notation" className="dropdown-item">
    JSON JavaScript Object Notation
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/modules" className="dropdown-item">
    Modules
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/dom-manipulation" className="dropdown-item">
    DOM Manipulation
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/events" className="dropdown-item">
    Events
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/ajax" className="dropdown-item">
    AJAX
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/fetch-api" className="dropdown-item">
    Fetch API
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/es6+-features" className="dropdown-item">
    ES6+ Features
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/web-apis" className="dropdown-item">
    Web APIs
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/libraries-and-frameworks" className="dropdown-item">
    Libraries and Frameworks
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/debugging" className="dropdown-item">
    Debugging
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/security" className="dropdown-item">
    Security
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/advanced-javascript-concepts" className="dropdown-item">
    Advanced JavaScript Concepts
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/modern-development-practices" className="dropdown-item">
    Modern Development Practices
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/testing-and-performance" className="dropdown-item">
    Testing and Performance
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/es6+-features-extended" className="dropdown-item">
    ES6+ Features Extended
  </NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/others" className="dropdown-item">
    Others
  </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Header;

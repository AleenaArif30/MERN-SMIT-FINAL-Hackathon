

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Navbar expand="md" bg="black" variant="dark" className="shadow-sm mb-3">
      <Container fluid className="justify-content-center">
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="bg-black text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="offcanvasNavbarLabel" className="text-warning">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex align-items-center justify-content-center">
          
            <Nav className="text-center d-flex flex-row gap-4">
              <NavLink to="/" text="Home" />
              <NavLink to="/task" text="Task" />
              {isAuthenticated ? (
                <NavButton to="/logout" text="Logout" />
              ) : (
                <>
                  <NavButton to="/signup" text="Sign Up" />
                  <NavButton to="/login" text="Login" />
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

const NavLink = ({ to, text }) => {
  const location = useLocation();
  return (
    <Nav.Link
      as={Link}
      to={to}
      className={`fw-bold fs-5 px-3 py-2 rounded ${
        location.pathname === to ? "bg-warning text-black" : "text-white"
      }`}
      style={{
        transition: "all 0.3s ease",
      }}
    >
      {text}
    </Nav.Link>
  );
};

const NavButton = ({ to, text }) => (
  <Button
    as={Link}
    to={to}
    size="sm"
    className="fw-bold fs-5 px-3 py-2 bg-warning text-black border-0 rounded"
    style={{
      transition: "all 0.3s ease",
    }}
  >
    {text}
  </Button>
);

export default Navigation;

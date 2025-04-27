
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Button,
} from "react-bootstrap";

// ✅ Replace with your updated logo path
import images from "../assets/images/images.jpg";


const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar expand="md" bg="dark" variant="dark" className="shadow-sm mb-3">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={images}
              alt="logo"
              style={{ height: "60px", objectFit: "contain" }}
              className="me-2"
            />
          </Navbar.Brand>

          {/* Offcanvas Toggle */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-dark text-white"
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              {/* Center Nav Items */}
              <Nav className="mx-auto text-center">
                <NavLink to="/" icon={faHome} text="Home" />
                <NavLink to="/products" text="Products" />
               
              
              </Nav>

              {/* Right Side - Auth Buttons */}
              <Nav className="ms-md-auto mt-3 mt-md-0 d-flex align-items-center gap-2 justify-content-md-end">
                {isAuthenticated ? (
                  <Button
                    variant="outline-light"
                    as={Link}
                    to="/logout"
                    size="sm"
                    className="px-3"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline-light"
                      as={Link}
                      to="/signup"
                      size="sm"
                      className="px-3"
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant="light"
                      as={Link}
                      to="/login"
                      size="sm"
                      className="px-3"
                    >
                      Login
                    </Button>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Nav.Link as={Link} to={to} className="text-white fw-medium px-3">
    {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
    {text}
  </Nav.Link>
);

export default Navigation;

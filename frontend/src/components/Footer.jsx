
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-success text-black pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          {/* About Us Section */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p className="">
              We are committed to providing the best products at unbeatable prices. Join our journey to bring quality to your doorstep.
            </p>
          </Col>

          {/* Quick Links */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/products" className="text-white text-decoration-none d-block p-2 hover-link">Products</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/about" className="text-white text-decoration-none d-block p-2 hover-link">About</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/contact" className="text-white text-decoration-none d-block p-2 hover-link">Contact</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/faq" className="text-white text-decoration-none d-block p-2 hover-link">FAQ</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Customer Service Section */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Customer Service</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/returns" className="text-white text-decoration-none d-block p-2 hover-link">Returns</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/shipping" className="text-white text-decoration-none d-block p-2 hover-link">Shipping</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/terms" className="text-white text-decoration-none d-block p-2 hover-link">Terms & Conditions</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark border-0 text-muted p-0 mb-2">
                <Link to="/privacy" className="text-white text-decoration-none d-block p-2 hover-link">Privacy Policy</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/* Follow Us Section */}
        <Row className="text-center mb-4">
          <Col>
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center gap-4">
              <a href="https://facebook.com" className="text-white fs-3">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-white fs-3">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-white fs-3">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-white fs-3">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Footer Section */}
        <Row className="text-center">
          <Col>
            <Button variant="outline-light" className="px-5 py-2 mb-3" onClick={() => window.scrollTo(0, 0)}>
              Back to Top
            </Button>
            <p className="text-muted small">© 2025 YourBrand. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

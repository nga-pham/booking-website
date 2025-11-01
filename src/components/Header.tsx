import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Heart } from "lucide-react";

const Header = () => {

    const services = [
    { name: "Confinement Nanny", href: "#confinement" },
    { name: "One Time / Ad Hoc", href: "#adhoc" },
    { name: "Recurring / Long-term", href: "#recurring" },
  ];

    return (
        // collapse below lg (show in one row at lg+). In production, consider change to md
        <Navbar bg="light" className="shadow-sm" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <span className="fs-4 fw-bold m-0">Fresha</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center"> 
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <Nav.Link href="/about">About us</Nav.Link>
            </Nav>
          <Button variant="success" className="d-flex align-items-center gap-2">
            <Heart size={16} />
            Become a Vendor
          </Button>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
import { Heart } from "lucide-react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {

    const links = [
        {
            name: "Services",
            href: "/services"
        },
        {
            name: "FAQ",
            href: "/faq"
        },
        {
            name: "About us",
            href: "/about"
        }
    ]

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
               {links.map((link, _idx) => (
                   <Nav.Link key={_idx} href={link.href}>{link.name}</Nav.Link>
               )
               )}
            </Nav>
          <Button variant="success" className="d-flex align-items-center gap-2">
            <Heart size={16} />
                        Become a Partner
          </Button>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
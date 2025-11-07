import { Container, Row, Col } from "react-bootstrap";
import { Phone, AtSign, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <section style={{ backgroundColor: "#F8F9FA" }}>
            <Container className="text-center pt-4" >
                <Row>
                    <Col lg={4}>
                        <span className="fs-4 fw-bold m-0">Fresha</span>
                        <p><Phone size={10} /> <a href="tel:+1234567890" className="text-decoration-none text-dark">+1 (234) 567-890</a></p>
                        <p><AtSign size={10} className="ms-3" /> <a href="mailto:nannycare@gmail.com " className="text-decoration-none text-dark">fresha@gmail.com</a></p>
                    </Col>
                    <Col lg={4}>
                        <h3>Find us on</h3>
                        <a href="#facebook" className="d-block mb-2 text-decoration-none text-dark">
                            <Facebook size={16} className="me-2" />Facebook
                        </a>
                        <a href="#x" className="d-block mb-2 text-decoration-none text-dark">
                            <Twitter size={16} className="me-2" />X (Twitter)
                        </a>
                        <a href="#linkedin" className="d-block mb-2 text-decoration-none text-dark">
                            <Linkedin size={16} className="me-2" />LinkedIn
                        </a>
                    </Col>
                    <Col lg={4}>
                        <a href="#policy" className="text-decoration-none text-dark d-block mb-2">Privacy Policy</a>
                        <a href="#terms" className="text-decoration-none text-dark d-block mb-2">Terms of Service</a>
                        <a href="#about" className="d-block mb-2 text-decoration-none text-dark">About us</a>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <p className="center-text">2025@Fresha. All rights reserved.</p>
                </Row>
            </Container>
        </section>
    )
};

export default Footer;
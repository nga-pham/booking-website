/* 
PSEUDOCODE / PLAN (detailed):
1. 
2. 
3. 
   - 
*/

import { User, Mail, Phone, MapPinHouse, MapPin, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";


const InformationFormBooking = ({ sendDataToBookingPage }) => {

    

    const [email, setEmail] = useState<string | "">("")
    const [name, setName] = useState<string | "">("")
    const [phoneNumber, setPhoneNumber] = useState<string | "">("")
    const [address, setAddress] = useState<string | "">("")
    const [district, setDistrict] = useState<string | "">("")
    const [state, setState] = useState<string | "">("")

    const handleFillInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (sendDataToBookingPage) {
            sendDataToBookingPage({ email, name, phoneNumber, address, district, state })
        }
    }

    return (
        <div className="text-start mt-5">
            <h3 style={{ fontWeight: 'bold' }}>Your Info</h3>
            <p style={{ color: 'rgba(0,0,0,0.5)' }}>We're almost here! Please provide your contact details and information about you.</p>

            <Form onSubmit={handleFillInfo}>
                <Row>
                    <Col>
                        <Form.Label>E-mail</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Mail size={18} />
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Full name</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <User size={18} />
                            </InputGroup.Text>
                            <Form.Control placeholder="Full name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Form.Label>Phone number</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Phone size={18} />
                            </InputGroup.Text>
                            <Form.Control type="number" placeholder="(+123) 456 7890"
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Street address</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <MapPinHouse size={18} />
                            </InputGroup.Text>
                            <Form.Control placeholder="123 Main Street"
                                onChange={e => setAddress(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Form.Label>District</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Building2 size={18} />
                            </InputGroup.Text>
                            <Form.Control placeholder="Đống Đa"
                                onChange={e => setDistrict(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>City</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <MapPin size={18} />
                            </InputGroup.Text>
                            <Form.Control placeholder="Hà Nội"
                                onChange={e => setState(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" className="mt-5 rounded-pill"
                        style={{ backgroundColor: 'black', color: "white" }}
                        type="submit"
                    >
                        Confirm
                    </Button>
                </Row>

            </Form>
        </div>
    )
}

export default InformationFormBooking
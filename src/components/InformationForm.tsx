import { User, Mail, Phone, MapPinHouse, MapPin, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import cities from '../data/cities.json';
import { chosenInfoProps } from './ui/Interfaces';


const InformationFormBooking = ({ sendDataToBookingPage }) => {
    const [email, setEmail] = useState<string | "">("")
    const [name, setName] = useState<string | "">("")
    const [phoneNumber, setPhoneNumber] = useState<string | "">("")
    const [address, setAddress] = useState<string | "">("")
    const [district, setDistrict] = useState<string | "">("")

    // handle district changes based on city change
    const [city, setCity] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);

    const handleCityChange = (e) => {

        const selectedCity = e.target.value;
        setCity(selectedCity);
        // Reset district when city changes
        setDistrict('');
        // Find the selected city's districts in the data
        const cityData = cities.find(data => data.city === city);
        if (cityData) {
            setAvailableDistricts(cityData.districts);
        } else {
            setAvailableDistricts([]);
        }
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
    };

    const isUserInfoValid = () => {
        return (
            email.trim() !== "" &&
            name.trim() !== "" &&
            phoneNumber.trim() !== "" &&
            address.trim() !== "" &&
            city.trim() !== ""
        )
    }

    const handleFillInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (sendDataToBookingPage) {
            const info: chosenInfoProps = { email, name, phoneNumber, address, city, district }
            sendDataToBookingPage(info)
        }
    }
    
        useEffect(() => {
        // TODO: send data to BookingResult
        isUserInfoValid()
    }, []);

    return (
        <div className="text-start mt-5">
            <h3 style={{ fontWeight: 'bold' }}>Your Info</h3>
            <p style={{ color: 'rgba(0,0,0,0.5)' }}>We're almost here! Please provide your contact details and information about you.</p>

            {/** booked information here*/}
            <Form onSubmit={handleFillInfo}>
                <Row>
                    <Col>
                        <Form.Label>E-mail<span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Mail size={18} />
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="email@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Full name<span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <User size={18} />
                            </InputGroup.Text>
                            <Form.Control placeholder="John Doe"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Form.Label>Phone number<span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Phone size={18} />
                            </InputGroup.Text>
                            <Form.Control type="tel" placeholder="(+123) 456 7890"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Street address<span className="text-danger">*</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <MapPinHouse size={18} />
                            </InputGroup.Text>
                            <Form.Control placeholder="123 Main Street"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-2">
                    {/* City Selection Dropdown */}
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City<span className="text-danger">*</span></Form.Label>
                        <Form.Select onChange={handleCityChange}>
                            <option disabled value="">Choose...</option>
                            {cities.map((data) => (
                                <option key={data.city} value={data.city}>{data.city}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* District Selection Dropdown */}
                    <Form.Group as={Col} controlId="formGridDistrict">
                        <Form.Label>District</Form.Label>
                        <Form.Select
                            value={district}
                            onChange={handleDistrictChange}
                            disabled={!city} // Disable district dropdown until a city is selected
                        >
                            <option value="">Choose...</option>
                            {availableDistricts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Button variant="primary" className="mt-5 rounded-pill"
                        style={{ backgroundColor: 'black', color: "white" }}
                        type="submit"
                        disabled={!isUserInfoValid()}
                    >
                        Confirm
                    </Button>
                </Row>

            </Form>
        </div>
    )
}

export default InformationFormBooking
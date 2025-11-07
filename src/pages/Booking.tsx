import { ArrowLeft, X, ChevronRight } from "lucide-react";
import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row, Card, Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import ServiceTabs from "../components/ui/ServiceTabs";
import { partnerDataWithId } from "../lib/utils";
import StarRating from "../components/ui/StarRating"

interface chosenOptionProps {
    services: string[];
    date: Date | null;
    startTime: string | "";
    endTime: string | "";
}

const BookingHeader = ({id }) => {
    // Go back
    const navigate = useNavigate()
    const goToDetail = () => {
        navigate(`/results/${id}`)
    }

    return (
            <Navbar bg="light" className="shadow-sm" sticky="top">
                <Container>
                    <div className="d-flex justify-content-end">
                        <ArrowLeft size={40} style={{ marginTop: '0.5rem', cursor: "pointer", border: "rgba(0,0,0,0.5)" }} onClick={goToDetail} />
                        <X size={40} style={{ marginTop: '0.5rem', cursor: "pointer", border: "rgba(0,0,0,0.5)" }} href={`/results/${id}`} />
                    </div>
                </Container>
            </Navbar>
    )
}

const MainContent = ({ id }) => {

    // To display
    const currentPartner = partnerDataWithId.find(partner => partner.id === Number(id))

    // Save chosen service
    const [chosenServices, setChosenServices] = useState<string[]>([])
    const handleChosenServicesFromTabs = (service: string | undefined) => {
        if (service === undefined) return; // optional guard
        setChosenServices(prev => Array.from(new Set([...prev, service])));
    }

    useEffect(() => {
        console.log('chosenServices updated:', chosenServices);
    }, [chosenServices]);

    return (
        <Container>
            <Row>
                <Col lg={8}>
                    <ServiceTabs services={currentPartner.services} isBookingPage={true}
                        sendDataToBookingPage={handleChosenServicesFromTabs}
                    />
                </Col>
                <Col lg={4}>
                    {/*booking information*/}
                    <Card className="mt-5 px-0 py-2">
                        <Card.Body>
                            <Container>
                                <Row className="text-start">
                                    <Col lg="3" className=""><Image rounded width="80px" height="80px" src={currentPartner.photos[0]} /></Col>
                                    <Col lg="9">
                                        <p style={{ fontSize: '1.1rem' }}><strong>{currentPartner.name}</strong></p>
                                        <p style={{ fontSize: '1.1rem' }}>
                                            <strong>{currentPartner.rating}</strong>
                                            <StarRating />({currentPartner.numberOfRating})
                                        </p>
                                        <p style={{ color: 'rgba(0,0,0,0.5)' }}>{currentPartner.address}</p>
                                    </Col>
                                </Row>
                                <Row className="text-start">
                                    {chosenServices.length > 0 ? (
                                        chosenServices.map((service) => {
                                            return (
                                                <Row key={service}>
                                                    <Col className="text-start">{service}</Col>
                                                    <Col className="text-end">Price</Col>
                                                </Row>
                                            )
                                        })
                                    ) : <p style={{ color: 'rgba(0,0,0,0.5)' }}>No service selected</p>
                                    }
                                </Row>
                            </Container>
                            
                        </Card.Body>
                        <Card.Footer className="justify-content-center">
                            {chosenServices.length > 0 ? 
                                <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                                    style={{ backgroundColor: 'black', color: "white" }}
                                >
                                    Continue <ChevronRight size={20} />
                                </Button>
                                :
                                <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                                    style={{ backgroundColor: 'black', color: "white" }} disabled
                                >
                                Continue <ChevronRight size={20} />
                            </Button>
                            }
                        </Card.Footer>
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    )
}

const Booking = () => {
    const params = useParams() //parameter in the Route path: {id}
    const id = params.id

    return (
        <div className="min-h-screen">
            <BookingHeader id={id} />
            <MainContent id={id } />
        </div>
    );
};

export default Booking;
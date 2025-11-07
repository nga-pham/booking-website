import { ArrowLeft, X, ChevronRight, Calendar, User, Mail, Phone, MapPinHouse, MapPin, Building2 } from "lucide-react";
import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row, Card, Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import ServiceTabs from "../components/ServiceTabs";
import { partnerDataWithId } from "../lib/utils";
import StarRating from "../components/ui/StarRating"
import DateTimeBooking from "../components/DateTimeBooking"
import InformationFormBooking from "../components/InformationForm"
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
                        <X size={40} style={{ marginTop: '0.5rem', cursor: "pointer", border: "rgba(0,0,0,0.5)" }} onClick={goToDetail} />
                    </div>
                </Container>
            </Navbar>
    )
}

const MainContent = ({ id }) => {

    // To display
    const currentPartner = partnerDataWithId.find(partner => partner.id === Number(id))
    const [serviceChosenCompleted, setServiceChosenCompleted] = useState<boolean>(false)
    const [dateTimeChosenCompleted, setDateTimeChosenCompleted] = useState<boolean>(false)

    const changeToNextSection = () => {
        // change to chosing date time page
        if (!serviceChosenCompleted) setServiceChosenCompleted(true)
        if (serviceChosenCompleted && !dateTimeChosenCompleted) setDateTimeChosenCompleted(true)

    }

    // Save chosen service
    const [chosenServices, setChosenServices] = useState<string[]>([])
    const handleChosenServicesFromTabs = (service: string | undefined) => {
        if (service === undefined) return; // optional guard
        setChosenServices(prev => Array.from(new Set([...prev, service])));
    }

    // Save chosen date time
    const [chosenDateTime, setChosenDateTime] = useState<Date | null>(null);
    const handleChosenDateTime = (date: Date | null) => {
        if (!date) return
        setChosenDateTime(date)
    }

    // Save chosen information
    const [chosenInfo, setChosenInfo] = useState<any | undefined>(undefined);
    const handleChosenInfo = (info: any | undefined) => {
        if (!info) return
        setChosenInfo(info)
    }

    useEffect(() => {
        console.log('chosenServices updated:', chosenServices);
    }, [chosenServices]);

    return (
        <Container>
            <Row>
                {/*choose options*/}
                <Col lg={8}>
                    {!serviceChosenCompleted ?
                        <ServiceTabs services={currentPartner.services} isBookingPage={true}
                            sendDataToBookingPage={handleChosenServicesFromTabs}
                        />
                        : (
                            !dateTimeChosenCompleted ? <DateTimeBooking sendDataToBookingPage={handleChosenDateTime} />
                                : <InformationFormBooking sendDataToBookingPage={handleChosenInfo} />
                        )
                    }
                </Col>

                {/*booking information*/}
                <Col lg={4}>
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
                                {chosenInfo ? 
                                    <Row >
                                        <Card className="text-start" style={{ color: 'rgba(0,0,0,0.5)' }}>
                                                <Card.Title><User size={20} style={{ marginRight: '0.5rem' }} />{ chosenInfo.name}</Card.Title>
                                                <Card.Text>
                                                    <Mail size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.email}
                                                </Card.Text>
                                                <Card.Text>
                                                    <Phone size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.phoneNumber}
                                                </Card.Text>
                                                <Card.Text>
                                                    <MapPinHouse size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.address}
                                                </Card.Text>
                                                <Card.Text>
                                                    <Building2 size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.district}
                                                </Card.Text>
                                                <Card.Text>
                                                    <MapPin size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.state}
                                                </Card.Text>
                                        </Card>
                                    </Row>
                                    : null
                                }
                                <Row className="text-start mt-2">
                                    {chosenDateTime ?
                                        <p style={{ color: 'rgba(0,0,0,0.5)' }} ><Calendar size={18} style={{marginRight: '0.5rem'} } />{chosenDateTime.toString()}</p>
                                        : <p style={{ color: 'rgba(0,0,0,0.5)' }}>No date selected</p>
                                    }
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
                                    onClick={changeToNextSection}
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
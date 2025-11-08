import { ArrowLeft, X, ChevronRight, Calendar, Clock, User, Mail, Phone, MapPinHouse, MapPin, Building2 } from "lucide-react";
import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Nav, Row, Card, Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import ServiceTabs from "../components/ServiceTabs";
import { partnerDataWithId } from "../lib/utils";
import StarRating from "../components/ui/StarRating"
import DateTimeBooking from "../components/DateTimeBooking"
import InformationFormBooking from "../components/InformationForm"
import { chosenServiceProps } from "../components/ui/Interfaces"

interface chosenOptionProps {
    services: chosenServiceProps[];
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
                <div className="d-flex justify-content-between container-fluid">
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
    const [chosenServices, setChosenServices] = useState<chosenServiceProps[]>([])
    const removeChosenService = (serviceToRemove: chosenServiceProps) => {
        setChosenServices(chosenServices.filter(item => item.name !== serviceToRemove.name))
    }
    const handleChosenServicesFromTabs = (service: chosenServiceProps | undefined) => {
        // handle when remove service
        if (service === undefined) {
            return
        }; 
        setChosenServices((prev: chosenServiceProps[]) => Array.from(new Set([...prev, service])));
    }

    // Save chosen date time
    const [chosenDateTime, setChosenDateTime] = useState<Date | null>(null);
    const [chosenDateString, setChosenDateString] = useState<string>("")
    const [chosenTimeString, setChosenTimeString] = useState<string>("")

    const handleChosenDateTime = (date: Date | null) => {
        if (!date) return // optional guard

        setChosenDateTime(date)
        const formatterTimeGB = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // This ensures 12-hour format with AM/PM
        });
        setChosenTimeString(formatterTimeGB.format(date))
        // Example: Format as "DD/MM/YYYY" for British English
        const formatterGB = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        setChosenDateString(formatterGB.format(date))
    }

    // Save chosen information
    const [chosenInfo, setChosenInfo] = useState<any | undefined>(undefined);
    const handleChosenInfo = (info: any | undefined) => {
        if (!info) return
        setChosenInfo(info)
    }

    // display totalCost
    const [totalCost, setTotalCost] = useState<number>(0)
    const calculateTotalCost = (services: chosenServiceProps[]) => {
        let sum = 0
        services.map(service => {
            sum += Number(service.cost)
        })
        setTotalCost(sum)
    }

    useEffect(() => {
        //console.log(chosenServices);
        calculateTotalCost(chosenServices)
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
                                        <>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }} >
                                                <Calendar size={18} style={{ marginRight: '0.5rem' }} />{chosenDateString}
                                            </p>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }}>
                                                <Clock size={18} style={{ marginRight: '0.5rem' }} />{chosenTimeString}
                                            </p>
                                        </>
                                        : <p style={{ color: 'rgba(0,0,0,0.5)' }}>No date selected</p>
                                    }
                                </Row>
                                <Row className="text-start">
                                    {chosenServices.length > 0 ? (
                                        chosenServices.map((service, _idx) => {
                                            return (
                                                <Row key={_idx}>
                                                    <Col className="text-start">{service.name}</Col>
                                                    <Col className="text-end">{service.cost} VND</Col>
                                                    {/*<Col className="text-end">
                                                        <Button variant="light" size="sm" className="rounded-circle" style={{ backgroundColor: "#F5F5F5" }}
                                                            onClick={() => removeChosenService(service)}
                                                        ><X size={12} />
                                                        </Button>
                                                    </Col>*/}
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
                                <>
                                    <Row style={{ fontWeight: 'bold' }}>
                                        <Col className="text-start">Total</Col>
                                        <Col className="text-end">{totalCost} VND</Col>
                                    </Row>
                                    <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                                        style={{ backgroundColor: 'black', color: "white" }}
                                        onClick={changeToNextSection}
                                    >
                                        Continue <ChevronRight size={20} />
                                    </Button>
                                </>
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
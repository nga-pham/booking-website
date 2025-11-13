import { ArrowLeft, X, ChevronRight, Calendar, Clock, User, Mail, Phone, MapPinHouse, MapPin, Building2, Hourglass } from "lucide-react";
import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Nav, Row, Card, Button, Image, Modal, Tabs, Tab } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import ServiceTabs from "../components/ServiceTabs";
import { partnerDataWithId } from "../lib/utils";
import StarRating from "../components/ui/StarRating"
import DateTimeBooking from "../components/DateTimeBooking"
import InformationFormBooking from "../components/InformationForm"
import { chosenServiceProps } from "../components/ui/Interfaces"
import ServiceCard from "../components/ui/ServiceCard";


interface chosenOptionProps {
    services: chosenServiceProps[];
    date: Date | null;
    startTime: string | "";
    duration: number | 0
}

const Booking = () => {
    const params = useParams() //parameter in the Route path: {id}
    const id = params.id
    const currentPartner = partnerDataWithId.find(partner => partner.id === Number(id))
    const {services} = currentPartner

    // Go back
    const navigate = useNavigate()
    const goToDetail = () => {
        navigate(`/results/${id}`)
    }
    // Flag to display
    const [serviceChosenCompleted, setServiceChosenCompleted] = useState<boolean>(false)
    const [dateTimeChosenCompleted, setDateTimeChosenCompleted] = useState<boolean>(false)

    const changeToNextSection = () => {
        // change to chosing date time page
        if (!serviceChosenCompleted) setServiceChosenCompleted(true)
        if (serviceChosenCompleted && !dateTimeChosenCompleted) setDateTimeChosenCompleted(true)
    }

    const [confirmPopupOpen, setConfirmPopupOpen] = useState<boolean>(false)
    
    const backToPreviousSection = () => {
        if (dateTimeChosenCompleted) setDateTimeChosenCompleted(false)
        else if (serviceChosenCompleted) setServiceChosenCompleted(false)
        else {
            // open popup to confirm
            setConfirmPopupOpen(true)
        }
    }
    const closeConfirmPopup = () => {
        setConfirmPopupOpen(false)
    }
    //For displaying featured servicess
    let featuredServices: any[] = services.flatMap(serviceType => serviceType.items.filter(item => item.featured));

    // Save chosen service, from "sendDataToTabs" function in ServiceCard
    const [chosenServices, setChosenServices] = useState<chosenServiceProps[]>([])

    const handleChosenServicesFromTabs = (savedService: chosenServiceProps) => {
        if (savedService !== undefined) {
            const newArray = [...chosenServices, savedService]
            const newSet = new Set(newArray.map(obj => obj.name))
            const uniqueObjectsByName = Array.from(newSet).map(name => 
                newArray.find(obj => obj.name === name)
            );
            setChosenServices(uniqueObjectsByName)
        }
    }

    const [deletedService, setDeletedService] = useState<chosenServiceProps>()
    const handleRemoveService = (index: number) => {
        setChosenServices(chosenServices.filter((_, i) => i !== index));
        setDeletedService(chosenServices.find((item, i) => i === index))
  };
  // send removed service to services section
    const isRemovedService = (serviceName) => {
        if (deletedService !== undefined && serviceName === deletedService.name) return true
        else return false
    }

    // Calculate total duration to display
    const [totalDuration, setTotalDuration] = useState<number>(0)
    const calculateTotalDuration = (services) => {
        let sum = 0
        services.map(service => {
            sum += Number(service.duration)
        })
        setTotalDuration(sum)
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
        calculateTotalCost(chosenServices)
        calculateTotalDuration(chosenServices)
        console.log(chosenServices)
        
    }, [chosenServices]);


    return (
        <div className="min-h-screen">
        {/*header*/}
            <Navbar bg="light" className="shadow-sm" sticky="top">
                <Container>
                    <div className="d-flex justify-content-between container-fluid">
                        <ArrowLeft size={40} style={{ marginTop: '0.5rem', cursor: "pointer", border: "rgba(0,0,0,0.5)" }}
                            onClick={backToPreviousSection}
                        />
                        <X size={40} style={{ marginTop: '0.5rem', cursor: "pointer", border: "rgba(0,0,0,0.5)" }} onClick={goToDetail} />
                    </div>
                </Container>
            </Navbar>
            <Modal show={confirmPopupOpen} onHide={closeConfirmPopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to leave this booking?</Modal.Title>
                </Modal.Header>
                <Modal.Body>All selections will be lost</Modal.Body>
                <Modal.Footer className="d-flex justify-content-center w-100">
                    <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                        style={{ backgroundColor: 'white', color: "black"}} 
                        onClick={closeConfirmPopup}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                        style={{ backgroundColor: 'black', color: "white" }}
                        onClick={() => { closeConfirmPopup(); goToDetail() }}
                    >
                        Yes, exit
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*main content*/}
            <Container>
                <Row>
                    {/*choose options*/}
                    <Col lg={8}>
                    {/*<ServiceTabs services={currentPartner.services} isBookingPage={true}
                                sendDataToBookingPage={handleChosenServicesFromTabs}
                            />*/}
                        {!serviceChosenCompleted ?
                            <div className="text-start mt-5">
                                <h3 style={{ fontWeight: 'bold'}}>Services</h3>
                                <Tabs defaultActiveKey="featured" fill>
                                    {/*featured tab here*/}
                                    <Tab eventKey="featured" title="Featured" key="tab-featured">
                                        {featuredServices.map((item, _idx) => (
                                            <ServiceCard
                                                id={_idx}
                                                name={item.name}
                                                duration={item.duration}
                                                cost={item.cost}
                                                isBookingPage={true}
                                                sendSavedServiceToTabs={handleChosenServicesFromTabs}
                                                isRemoved={isRemovedService(item.name)}
                                            />
                                        ))}
                                    </Tab>
                                    {services.map(skill => (
                                        <Tab eventKey={skill.type} title={skill.type} key={skill.type}>
                                            {skill.items.map((item, _idx) => (
                                                <ServiceCard
                                                    id={_idx}
                                                    name={item.name}
                                                    duration={item.duration}
                                                    cost={item.cost}
                                                    isBookingPage={true}
                                                    sendSavedServiceToTabs={handleChosenServicesFromTabs}
                                                    isRemoved={isRemovedService(item.name)}
                                                />
                                            ))}
                                        </Tab>
                                    ))}
                                </Tabs>
                            </div>
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
                                        <Col lg="3" style={{marginRight: '0.25rem' }}><Image rounded width="80px" height="80px" src={currentPartner.photos[0]} /></Col>
                                        <Col lg="7">
                                            <p style={{ fontSize: '1.1rem' }}><strong>{currentPartner.name}</strong></p>
                                            <p style={{ fontSize: '1.1rem' }}>
                                                <strong>{currentPartner.rating}</strong>
                                                <StarRating />({currentPartner.numberOfRating})
                                            </p>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }}>{currentPartner.address}</p>
                                        </Col>
                                    </Row>
                                    {chosenInfo ?
                                        <Row className="text-start mt-2">
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }} >
                                                <User size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.name}
                                            </p>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }} >
                                                <Mail size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.email}
                                            </p>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }} >
                                                <Phone size={18} style={{ marginRight: '0.5rem' }} />{chosenInfo.phoneNumber}
                                            </p>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }} >
                                                <MapPin size={18} style={{ marginRight: '0.5rem' }} />
                                                {chosenInfo.address}
                                                  <br />
                                                  {chosenInfo.district}, {chosenInfo.state}
                                            </p>
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
                                            <>
                                                <p style={{ color: 'rgba(0,0,0,0.5)' }}>
                                                    <Hourglass size={18} style={{ marginRight: '0.5rem' }} />{totalDuration} hours total
                                                </p>
                                                {chosenServices.map((service, _idx) => {
                                                    return (
                                                            <Row key={_idx}>
                                                                <Col className="text-start">{service.name}</Col>
                                                                <Col className="text-end">{service.cost.toLocaleString('en-US')} VND</Col>
                                                                <Col className="text-end">
                                                                    <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#F5F5F5" }}
                                                                        onClick={() => handleRemoveService(_idx)}
                                                                      >
                                                                        <X size={14} />
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                    )
                                                }) }
                                            </>
                                        ) : <p style={{ color: 'rgba(0,0,0,0.5)' }}>No service selected</p>
                                        }
                                    </Row>
                                </Container>

                            </Card.Body>
                            <Card.Footer className="justify-content-center">
                            <Row style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                                 <Col className="text-start">Total</Col>
                                 <Col className="text-end">{totalCost.toLocaleString('en-US')} VND</Col>
                            </Row>
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
        </div>
    );
};

export default Booking;
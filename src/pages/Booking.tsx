import { ArrowLeft, X, ChevronRight, Calendar, Clock, User, Mail, Phone, MapPinHouse, MapPin, Building2, Hourglass } from "lucide-react";
import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Nav, Row, Card, Button, Image, Modal, Tabs, Tab } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { partnerDataWithId } from "../lib/utils";
import StarRating from "../components/ui/StarRating"
import DateTimeBooking from "../components/DateTimeBooking"
import InformationFormBooking from "../components/InformationForm"
import { chosenServiceProps } from "../components/ui/Interfaces"
import ServiceCard from "../components/ui/ServiceCard";
import { chosenInfoProps } from "../components/ui/Interfaces";

const ContinueButton = ({ chosenServices, serviceChosenCompleted, dateTimeChosenCompleted, chosenInfo, changeToNextSection }) => {
    const DisabledButton = () => (
        <Button variant="primary" size="lg" className="rounded-pill"
        style={{ backgroundColor: 'black', color: "white" }} disabled
    >
        Continue <ChevronRight size={20} />
    </Button>
    )

    const EnabledButton = () => (
        <Button variant="primary" size="lg" className="rounded-pill"
            style={{ backgroundColor: 'black', color: "white" }}
            onClick={changeToNextSection}
        >
            Continue <ChevronRight size={20} />
        </Button>
    )

    // at service section
    if (!serviceChosenCompleted) {
        if (chosenServices.length > 0) return <EnabledButton /> 
        else return <DisabledButton />
    // at datetime section
    } else if (!dateTimeChosenCompleted) {
        return <EnabledButton />
    // at info section
    } else if (!chosenInfo) {
        return <DisabledButton />
    } else return <EnabledButton />
}

const Booking = () => {
    const params = useParams() //parameter in the Route path: {id}
    const id = params.id
    const currentPartner = partnerDataWithId.find(partner => partner.id === Number(id))
    const { services } = currentPartner


    // Flag to display
    const [serviceChosenCompleted, setServiceChosenCompleted] = useState<boolean>(false)
    const [dateTimeChosenCompleted, setDateTimeChosenCompleted] = useState<boolean>(false)

    const changeToNextSection = () => {
        // change to chosing date time page
        if (!serviceChosenCompleted) setServiceChosenCompleted(true)
        if (serviceChosenCompleted && !dateTimeChosenCompleted) setDateTimeChosenCompleted(true)
        // TODO: send booking data
    }

    // handle back to detail page or stay
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
    const [chosenInfo, setChosenInfo] = useState<chosenInfoProps | undefined>(undefined);
    const handleChosenInfo = (info: chosenInfoProps | undefined) => {
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

    // Go back and erase all data
    const navigate = useNavigate()
    const goToDetail = () => {
        setChosenServices([])
        setChosenDateTime(undefined)
        setChosenInfo(undefined)
        navigate(`/results/${id}`)
    }

    useEffect(() => {
        calculateTotalCost(chosenServices)
        calculateTotalDuration(chosenServices)
        // TODO: send data to BookingResult
        console.log(chosenServices, chosenDateTime, chosenInfo)
    }, [chosenServices, chosenDateTime, chosenInfo]);


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
                        style={{ backgroundColor: 'white', color: "black" }}
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
                        {!serviceChosenCompleted ?
                            <div className="text-start mt-5">
                                <h3 style={{ fontWeight: 'bold' }}>Services</h3>
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
                        <Card className="mt-5 px-0 py-2 shadow-sm border-0 flex-shrink-0 sticky top-6"
                            style={{ width: "380px", height: "fit-content" }}
                        >
                            <Card.Body className="p-6">
                                <Container>
                                    {/* Shop Info */}
                                    <Row className="text-start">
                                        <Col lg="3" style={{ marginRight: '0.25rem' }}><Image rounded width="80px" height="80px" src={currentPartner.photos[0]} /></Col>
                                        <Col lg="7">
                                            <p style={{ fontSize: '1.1rem' }}><strong>{currentPartner.name}</strong></p>
                                            <p style={{ fontSize: '1.1rem' }}>
                                                <strong>{currentPartner.rating}</strong>
                                                <StarRating />({currentPartner.numberOfRating})
                                            </p>
                                            <p style={{ color: 'rgba(0,0,0,0.5)' }}>{currentPartner.address}</p>
                                        </Col>
                                    </Row>
                                    {/* User Info Display */}
                                    {chosenInfo ?
                                        <Row className="text-start mt-2">
                                            <div className="mb-4 border-b border-border">
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
                                                    {chosenInfo.district}, {chosenInfo.city}
                                                </p>
                                            </div>
                                        </Row>
                                        : null
                                    }
                                    {/* Selected Date & Time */}
                                    <Row className="text-start mt-2">
                                        <div className="mb-4 border-b border-border">
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
                                        </div>
                                    </Row>
                                    <Row className="text-start">
                                        <div className="mb-4 border-b border-border">

                                            {chosenServices.length > 0 ? (
                                                <>
                                                    <p style={{ color: 'rgba(0,0,0,0.5)' }}>
                                                        <Hourglass size={18} style={{ marginRight: '0.5rem' }} />{totalDuration} hours total
                                                    </p>
                                                    {chosenServices.map((service, _idx) => {
                                                        return (
                                                            <Row key={_idx}>
                                                                <Col className="text-start" lg={6}>{service.name}</Col>
                                                                <Col className="text-end" lg={4}>{service.cost.toLocaleString('vi-VN')} VND</Col>
                                                                <Col className="text-end" lg={2}>
                                                                    <Button variant="light" className="rounded-circle"
                                                                        style={{ backgroundColor: "#F5F5F5" }}
                                                                        onClick={() => handleRemoveService(_idx)}
                                                                    >
                                                                        <X size={14} />
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })}
                                                </>
                                            ) : <p style={{ color: 'rgba(0,0,0,0.5)' }}>No service selected</p>
                                            }
                                        </div>
                                    </Row>
                                </Container>
                            </Card.Body>
                            {/* separator */}
                            <div className="border-t border-border my-4"></div>

                            <Card.Footer className="justify-content-center">
                                {/* total cost */}
                                <Row style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                                    <Col className="text-start">Total</Col>
                                    <Col className="text-end">{totalCost.toLocaleString('vi-VN')} VND</Col>
                                </Row>
                                <ContinueButton 
                                chosenServices={chosenServices} 
                                serviceChosenCompleted={serviceChosenCompleted}
                                dateTimeChosenCompleted={dateTimeChosenCompleted}
                                chosenInfo={chosenInfo}
                                changeToNextSection={changeToNextSection}
                                />
                            </Card.Footer>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Booking;
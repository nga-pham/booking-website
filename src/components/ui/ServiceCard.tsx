import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Plus, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react'
import { chosenServiceProps } from "./Interfaces"

// properties for each service from "services" props in partners.json
interface ServiceCardProps {
    id: number | 0;
    name: string | "";
    duration: string | "";
    cost: number | 0;
    isBookingPage: boolean | false,
    sendDataToTabs: (savedService: chosenServiceProps, removedService: chosenServiceProps) => void
    isChosen?: boolean | false
}

const ServiceCard = ({ id, name, duration, cost, isBookingPage, sendDataToTabs }: ServiceCardProps) => {
    // Save service to book and send to tabs
    const [savedService, setSavedService] = useState<chosenServiceProps>(undefined)
    const [removedService, setRemovedService] = useState<chosenServiceProps>(undefined)

    // change style when chosen
    const [isChosenOnClick, setIsChosenOnClick] = useState<boolean>(false)
    const cardClasses = `mt-3 py-0 px-2 ${isChosenOnClick ? "border-success" : null }`

    const getChosenService = (service: chosenServiceProps) => {
        setSavedService(service)
        setIsChosenOnClick(true)
    }

    const removeChosenService = (service: chosenServiceProps) => {
        setRemovedService(service)
        setIsChosenOnClick(false)

    }

    useEffect(() => {
        sendDataToTabs(savedService, removedService)
    }, [savedService, removedService])

    if (!isBookingPage) {
        return (
            <Card style={{ width: "50rem", borderRadius: '1rem' }} className="mt-3 py-0 px-2" key={id}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Card.Title style={{ fontSize: '1.1rem' }}>{name}</Card.Title>
                            <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{duration}</Card.Text>
                            <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>

                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    } else {
        return (
            <Card style={{ width: "50rem", borderRadius: '1rem' }} className={ cardClasses} key={id}>
                <Card.Body>
                    <Container style={{ position: 'relative' }}>
                        <Row>
                            <Col>
                                <Card.Title style={{ fontSize: '1.1rem' }}>{name}</Card.Title>
                                <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{duration}</Card.Text>
                                <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>
                            </Col>
                            {/* make the height stretch full height; right-align vertical-center the plus icon */}
                            {!isChosenOnClick ?
                                <Col className="d-flex align-items-center justify-content-end w-100">
                                    <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#F5F5F5" }}
                                        onClick={() => getChosenService({ name, cost: Number(cost) })}
                                    >
                                        <Plus size={20} />
                                    </Button>
                                </Col>
                                : <Col className="d-flex align-items-center justify-content-end w-100" >

                                    <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#8bca84" }}
                                        onClick={() => removeChosenService({ name, cost: Number(cost) })}
                                    >
                                        <X size={20} />
                                    </Button>
                                </Col>
                            }
                        </Row>
                        {isChosenOnClick ? <div style={{ position: 'absolute', top: 0, right: 0 }}><Check size={20} color="#8bca84" /></div> : null}
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}

export default ServiceCard
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Plus, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react'
import { chosenServiceProps } from "./Interfaces"

// properties for each service from "services" props in partners.json
interface ServiceCardProps {
    id: number | 0;
    name: string | "";
    duration: number | 0;
    cost: number | 0;
    isBookingPage: boolean | false,
    sendSavedServiceToTabs?: (savedService: chosenServiceProps) => void     // for booking page only
    isRemoved?: boolean | true
}

const ServiceCard = ({ id, name, duration, cost, isBookingPage, 
    sendSavedServiceToTabs,
    isRemoved
    }: ServiceCardProps) => {
    // display duration in string like 2 h 30 minss
    const hour = Math.floor(duration); // "9"
    const minutes = (duration - hour) * 60;
    let hourString = `${hour} h ${minutes} mins`;
    if (hour === 0) hourString = `${minutes} mins`

    // Save service to book and send to tabs
    const [savedService, setSavedService] = useState<chosenServiceProps>(undefined)
    //const [removedService, setRemovedService] = useState<chosenServiceProps>(undefined)

    // change style when chosen
    const [isChosenOnClick, setIsChosenOnClick] = useState<boolean>(false)
    const cardClasses = `mt-3 py-0 px-2 ${isChosenOnClick ? "border-success" : null }`

    const getChosenService = (service: chosenServiceProps) => {
        setSavedService(service)
        setIsChosenOnClick(true)
    }
    
    // When you already choose and now remove it
    if (isChosenOnClick && isRemoved) setIsChosenOnClick(false)

    if (isBookingPage) {
        useEffect(() => {
        sendSavedServiceToTabs(savedService)
    }, [savedService])
    }

    if (!isBookingPage) {
        return (
            <Card style={{ width: "50rem", borderRadius: '1rem' }} className="mt-3 py-0 px-2" key={id}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Card.Title style={{ fontSize: '1.1rem' }}>{name}</Card.Title>
                            <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{hourString}</Card.Text>
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
                                <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{hourString}</Card.Text>
                                <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>
                            </Col>
                            {/* make the height stretch full height; right-align vertical-center the plus icon */}
                            {isChosenOnClick && !isRemoved ?
                                <Col className="d-flex align-items-center justify-content-end w-100" >

                                    <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#8bca84" }}
                                    >
                                        <Check size={20} />
                                    </Button>
                                </Col>
                                : <Col className="d-flex align-items-center justify-content-end w-100">
                                    <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#F5F5F5" }}
                                        onClick={() => getChosenService({ name, duration, cost: Number(cost) })}
                                    >
                                        <Plus size={20} />
                                    </Button>
                                </Col>
                            }
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}

export default ServiceCard
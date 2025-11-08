import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Plus, Check } from 'lucide-react';
import { useState, useEffect } from 'react'
import { chosenServiceProps } from "./Interfaces"

// properties for each service from "services" props in partners.json
interface ServiceCardProps {
    id: number | 0;
    name: string | "";
    duration: string | "";
    cost: number | 0;
    isBookingPage: boolean | false,
    sendDataToTabs: (any) => void

}

const ServiceCard = ({ id, name, duration, cost, isBookingPage, sendDataToTabs }: ServiceCardProps) => {
    // Save service to book and send to tabs
    const [savedService, setSavedService] = useState<chosenServiceProps>(undefined)
    // change style when chosen
    const [isChosen, setIsChosen] = useState<boolean>(undefined)

    const getChosenService = (service) => {
        setSavedService(service)
        setIsChosen(true)
    }


    useEffect(() => {
        console.log(isChosen)
        sendDataToTabs(savedService)
    }, [savedService])

    

    if (!isChosen) return (
        <Card style={{ width: "50rem", borderRadius: '1rem' }} className="mt-3 py-0 px-2" key={id}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <Card.Title><p style={{ fontSize: '1.1rem' }}>{name}</p></Card.Title>
                            <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{duration}</Card.Text>
                            <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>
                        </Col>
                        {/* make the height stretch full height; right-align vertical-center the plus icon */}
                        {isBookingPage && <Col className="d-flex align-items-center justify-content-end h-100">
                            <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#F5F5F5" }}
                                onClick={() => getChosenService({name, cost: Number(cost)})}
                            >
                                <Plus size={20} />
                            </Button>
                        </Col>}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )

    else return ( // green bordered card with checked item
        <Card style={{ width: "50rem", borderRadius: '1rem', border: "2px solid #3b8132" }} className="mt-3 py-0 px-2" key={id}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <Card.Title><p style={{ fontSize: '1.1rem' }}>{name}</p></Card.Title>
                            <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{duration}</Card.Text>
                            <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>
                        </Col>
                        {/* make the height stretch full height; right-align vertical-center the plus icon */}
                        {isBookingPage && <Col className="d-flex align-items-center justify-content-end h-100">
                            <div style={{ width: '40px', height: '32px', backgroundColor: "#F5F5F5", borderRadius: '50%', paddingLeft: '0.5rem' }}><Check size={20} /></div>
                        </Col>
                        }
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default ServiceCard
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

    const removeChosenService = () => {
        setSavedService(undefined)
        setIsChosen(false)
    }

    useEffect(() => {
        console.log(savedService)
        sendDataToTabs(savedService)
    }, [savedService])

    

    if (!isChosen) return (
        <Card style={{ width: "50rem", borderRadius: '1rem' }} className="mt-3 py-0 px-2" key={id}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <Card.Title style={{ fontSize: '1.1rem' }}>{name}</Card.Title>
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
                            <Card.Title style={{ fontSize: '1.1rem' }}>{name}</Card.Title>
                            <Card.Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>{duration}</Card.Text>
                            <Card.Text style={{ fontSize: '1rem' }}>{cost.toString()} VND</Card.Text>
                        </Col>
                        {/* make the height stretch full height; right-align vertical-center the icon */}
                        {isBookingPage &&
                            <Col className="d-flext text-end">
                                <Button variant="light" className="rounded-circle" style={{ backgroundColor: "#8bca84" }}
                                    disabled
                            >
                                    <Check size={20} />
                                </Button>
                            {/*<Button variant="light" className="rounded-circle" style={{ backgroundColor: "#F5F5F5" }}*/}
                            {/*    onClick={() => removeChosenService()}*/}
                            {/*>*/}
                            {/*    <X size={20} />*/}
                            {/*</Button>*/}
                            </Col>
                        }
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default ServiceCard
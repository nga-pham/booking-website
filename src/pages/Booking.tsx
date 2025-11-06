import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import ServiceTabs from "../components/ui/ServiceTabs";
import { partnerDataWithId } from "../lib/utils";


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
                    {chosenServices.length > 0 ? (
                        chosenServices.map((service) => {
                            return (
                                <p key={service}>{service}</p>
                            )
                        })
                    ) : (
                        <p>No service selected</p>
                    )}
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
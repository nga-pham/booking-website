import { useState } from "react";
import { Container, Row, Col, Button, CardGroup, Form } from "react-bootstrap";
import { Star, PawPrint, ChevronRight, Plus, Minus } from "lucide-react";
import heroImage from "../assets/caregiver.jpg";
import caregiversGroup from "../assets/caregiver-group.jpg";
import serviceIcon from '../assets/service-icon.png';
import HeroCard from "../components/ui/HeroCard";
import moment from 'moment'; 
import { useNavigate } from 'react-router-dom';

// interface of data to pass to result page
interface serviceProps {
    id: string;
    title: string;
}

interface resultsStateProps {
    service: serviceProps;
    date: string;
    numOfBabies: number;
}

const selectedServices = [
    { id: "conf-nanny", title: "Confinement Nanny" },
    { id: "adhoc", title: "One Time / Ad Hoc" },
    { id: "recurring", title: "Recurring / Long-term" },
]

const HeroSection = () => {

    // Choose services from card group
    const [selectedService, setSelectedService] = useState({ id: "", title: "" });

    // Choose date range
    const [selectedDate, setSelectedDate] = useState('');
    const formattedDisplayDate = selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : '';
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
      };

    // Choose number of babies
    const [numOfBabies, setNumOfBabies] = useState(1);
    const incrementBabies = () => setNumOfBabies(numOfBabies + 1);
    const decrementBabies = () => setNumOfBabies(num => {
        if (num > 1) {
            return num - 1;
        } else return 1;
    });

    // Pass data to results page
    const navigate = useNavigate();
    const resultsState: resultsStateProps = {
        "service": selectedService,
        "date": formattedDisplayDate,
        "numOfBabies": numOfBabies
    }
    // TODO: if one property is empty, display tooltip to remind user

    // else go to result page
    const gotoResults = () => { navigate("/results", { state: resultsState }) }


    return (
        <section className="py-5">
            <Container>
                <Row className="align-items-center g-5">
                    {/*Service selection and booking form*/}
                    <Col lg={7}>
                        <div className="mb-4">
                            <h1 className="display-3 fw-bold mb-3">Local, trusted nanny care</h1>
                            <p className="fs-4 text-muted">Book 5-star babysitting near you</p>
                        </div>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="d-flex">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="rounded-circle border border-3 border-white"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            marginLeft: i > 1 ? "-12px" : "0",
                                            backgroundImage: `url(${caregiversGroup})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: `${(i - 1) * 33}% center`,
                                        }}
                                    />
                                ))}
                            </div>
                            <div>
                                <div className="d-flex gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                                    ))}
                                </div>
                                <p className="mb-0 fw-medium small">400K+ babysisters nationwide</p>
                            </div>
                        </div>

                        <div className="bg-success p-4 rounded-4 shadow-lg">
                            <h2 className="fs-5 fw-bold text-white mb-4">
                                Ready to get started? Book your first service now!
                            </h2>

                            {/* Service Selection */}
                            <CardGroup>
                                {selectedServices.map((service) => (
                                        <HeroCard
                                            key={service.id}
                                            icon={serviceIcon}
                                            title={service.title}
                                        onClick={() => setSelectedService(service)}
                                        selected={selectedService.id === service.id}
                                        />
                                ))}
                            </CardGroup>

                            <div className="bg-white p-3 rounded-3 d-flex flex-column flex-sm-row gap-3 align-items-center">
                                <div className="d-flex gap-3 flex-wrap">
                                    {/* Date/Time picker */}
                                    <div className="d-flex align-items-center gap-2 bg-light px-3 py-2 rounded-3">
                                        <Form.Group controlId="formDate">
                                            <Form.Label>Select Date </Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                            />
                                        </Form.Group>
                                    </div>

                                    {/* Number of babies selector */ }
                                    <div className="d-flex align-items-center gap-2 bg-light px-3 py-2 rounded-3">
                                        <Plus style={{ cursor: "pointer", }} onClick={incrementBabies}>+</Plus>
                                        {numOfBabies} Babies
                                        <Minus style={{ cursor: "pointer", }} onClick={decrementBabies}>-</Minus>
                                    </div>
                                </div>

                                {/*go to results page*/}
                                <Button variant="primary" size="lg" className="d-flex align-items-center gap-2 ms-sm-auto"
                                    onClick={gotoResults}>
                                    Continue <ChevronRight size={10} />
                                </Button>
                            </div>
                        </div>
                    </Col>

                    {/* Logo */ }
                    <Col lg={5} className="d-flex justify-content-center justify-content-lg-end">
                        <div className="position-relative">
                            <div
                                className="position-absolute bg-white shadow-lg rounded-circle d-flex align-items-center justify-content-center p-3"
                                style={{
                                    width: "128px",
                                    height: "128px",
                                    top: "-16px",
                                    right: "-16px",
                                    zIndex: 10,
                                }}
                            >
                                <div className="border border-success border-3 rounded-circle w-100 h-100 d-flex align-items-center justify-content-center">
                                    <div className="text-center">
                                        <div className="d-flex justify-content-center gap-1 mb-1">
                                            <PawPrint size={16} fill="#198754" color="#198754" />
                                            <PawPrint size={16} fill="#198754" color="#198754" />
                                        </div>
                                        <p className="mb-0 fw-bold" style={{ fontSize: "9px", lineHeight: "1.2" }}>
                                            TRUSTED BY<br />MILLIONS OF<br />PARENTS
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-circle overflow-hidden shadow"
                                style={{ width: "500px", height: "500px" }}
                            >
                                <img
                                    src={heroImage}
                                    alt="Professional pet caregiver with a happy dog"
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
import { ChevronUp, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import About from "../components/About";
import Footer from "../components/Footer";
import Header from "../components/Header";
import OpeningTimes from "../components/OpeningTimes";
import ReviewList from "../components/ReviewList";
import ServiceTabs from "../components/ServiceTabs";
import GetDirectionLink from "../components/ui/GetDirectionLink";
import MyBreadCrumb from "../components/ui/MyBreadCrumb";
import StarRating from "../components/ui/StarRating";
import { partnerDataWithId } from "../lib/utils";

/* child components */
const NoPartner = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <section className="py-5">
                <Container>
                    <Row className="text-start g-5 mt-2">
                        <h1 style={{ fontWeight: 'bold' }}>Shop not found</h1>
                        <p>The requested Shop does not exist.</p>
                        <a href="/" className="text-blue-500 underline hover:text-blue-700">
                            Return to Home
                        </a>
                    </Row>
                </Container>
            </section>
            <Footer />
        </div>
    );
}

/* Main component */
const Detail = () => {
    // get current partner data to display
    const { id } = useParams(); // 'id' matches the parameter partner in the Route path: /result/{id}
    const currentPartner = partnerDataWithId.find(partner => partner.id === Number(id))

    // If partner not found, show a simple message
    if (!currentPartner) {
        return <NoPartner />
    }

    /*For basic information*/
    const { name, rating, numberOfRating, address, photos, services, startTime, endTime } = currentPartner
    // get current time
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    // get opening and closing hour
    let timeParts = startTime.split(':');
    const startHour = parseInt(timeParts[0], 10) + parseFloat(timeParts[1]) / 60;
    timeParts = endTime.split(':');
    const endHour = parseInt(timeParts[0], 10) + parseFloat(timeParts[1]) / 60;
    // Check if currently open or closed. Then display different text accordingly
    const [hoursOpen, setHoursOpen] = useState(false);
    const isOpen = startHour <= currentHour && currentHour <= endHour;

    const openOrCloseText = isOpen ?
        (
            <span className="mb-3">
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setHoursOpen(!hoursOpen)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setHoursOpen(!hoursOpen) }}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: 0 }}
                >
                    <Clock size={18} className="text-foreground" />
                    <span style={{ color: '#16a34a', fontWeight: 500 }}>Open until {currentPartner.endTime}</span>
                    <ChevronUp
                        size={16}
                        style={{ marginLeft: 'auto', transform: hoursOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}
                    />
                </div>

                {hoursOpen && (
                    <div className="mt-3 ps-1">
                        {currentPartner.openingTimes.map((time, idx) => (
                            <div key={idx} className="d-flex align-items-center justify-content-between py-2">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="rounded-circle bg-success" style={{ width: "8px", height: "8px" }} />
                                    <span className="fw-medium">{time.date}</span>
                                </div>
                                <span>
                                    {time.startTime} - {time.endTime}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </span>
        ) : (
            <div>
                <span style={{ color: "#FF0000" }}>Closed</span>
                <span>. Open tomorrow from {startTime}</span>
            </div>
        );

    // handle navigation to booking page
    const navigate = useNavigate();
    const goToBooking = () => {
        navigate(`/results/${id}/booking`)
    }

    return (
        <div className="min-h-screen">

            <Header />

            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <MyBreadCrumb isList={false} name={name} />
                    </Row>

                    {/*basic information here*/}
                    <Row className="text-start g-5 mt-2 mb-4">
                        <h1 style={{ fontWeight: 'bold' }}>{name}</h1>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>{rating}</span>
                            <StarRating />
                            ({numberOfRating}) . <span style={{ color: '#16a34a', fontWeight: 500 }}>Open until {currentPartner.endTime}</span>
                            . <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{address}</span>
                        </div>
                    </Row>

                    {/*photos here*/}
                    <Row>
                        <Carousel>
                            {Array.isArray(photos) ?
                                photos.map((photo, photoIndex) => {
                                    return (
                                        <Carousel.Item key={photoIndex}>
                                            <img
                                                src={photo}
                                                alt={`Photo ${photoIndex + 1}`}
                                                className="d-block w-100"
                                            />
                                        </Carousel.Item>
                                    )
                                }
                                )
                                : <img src={photos} alt='Photo' className="d-block w-100" />
                            }
                        </Carousel>
                    </Row>

                    <Row className="g-5">
                        {/*services and other information here*/}
                        <Col lg={8}>
                            {/* each card does not contain plus button, because this is not booking place */}
                            <ServiceTabs services={services} isBookingPage={false} />
                            <ReviewList currentPartner={currentPartner} />
                            <About currentPartner={currentPartner} />
                            <OpeningTimes currentPartner={currentPartner} />
                        </Col>

                        {/*booking place here*/}
                        <Col lg={4}>
                            <div className="mt-5 sticky-top">
                                <Card className="shadow border-0 text-start">
                                    <Card.Body>
                                        <Card.Title>
                                            <h2>{name}</h2>
                                        </Card.Title>
                                        <Card.Text style={{ fontSize: '1.25rem' }}>
                                            <strong>{rating}</strong>
                                            <StarRating />
                                            ({numberOfRating})
                                        </Card.Text>
                                        <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                                            style={{ backgroundColor: 'black', color: "white" }}
                                            onClick={goToBooking}
                                        >
                                            Book now
                                        </Button>
                                    </Card.Body>
                                    <Card.Footer style={{ backgroundColor: "white" }}>
                                        <div>{openOrCloseText}</div>
                                        <div>
                                            <MapPin size={18} className="text-foreground" />
                                            <span style={{ color: 'rgba(0, 0, 0, 0.5)', marginLeft: '0.5rem' }}>{address} . </span><GetDirectionLink address={address} />
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </div>
    );
}

export default Detail;
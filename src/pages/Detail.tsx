import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import ReviewList from "../components/ReviewList";
import ServiceTabs from "../components/ServiceTabs";
import MyBreadCrumb from "../components/ui/MyBreadCrumb";
import StarRating from "../components/ui/StarRating";
import { partnerDataWithId } from "../lib/utils";
import About from "../components/About";
import OpeningTimes from "../components/OpeningTimes";

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
    const openOrCloseText = (startHour <= currentHour && currentHour <= endHour)
        ? <span style={{ color: "#008000" }}>Open until {endTime}</span>
        : (
            // Use a fragment for the else branch so both spans are returned together
            <>
                <span style={{ color: "#FF0000" }}>Closed</span>
                <span>. Open tomorrow from {startTime}</span>
            </>
        );

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
                    <Row className="text-start g-5 mt-2">
                        <h1 style={{ fontWeight: 'bold' }}>{name}</h1>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>{rating}</span>
                            <StarRating />
                            ({numberOfRating}) . {openOrCloseText}
                            . <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{address}</span>
                        </p>
                    </Row>

                    {/*photos here*/}
                    <Row>
                        <Carousel>
                            {Array.from({ length: 3 }, (_, _index) => {
                                return (
                                    <Carousel.Item key={_index}>
                                        <img src={photos} alt={`Photo ${_index + 1}`} className="d-block w-100" />
                                    </Carousel.Item>
                                )
                            })}
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
                                        <p>{openOrCloseText} </p>
                                        <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{address}</span>
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
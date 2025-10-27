import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import nannies from "../nannies.json";
import { Container, Row, Carousel, Col, Card, Button, Breadcrumb } from "react-bootstrap";
import { Star } from 'lucide-react';
import { useState } from 'react';


const Detail = () => {

    // get current nanny data to display
    const { id } = useParams(); // 'id' matches the parameter name in the Route path: /result/{id}
    const currentNanny = nannies.find(nanny => nanny.id === Number(id));

    // If nanny not found, show a simple message
    if (!currentNanny) {
        return (
            <div className="min-h-screen">
                <Header />
                <section className="py-5">
                    <Container>
                        <Row className="text-start g-5 mt-2">
                            <h1 style={{ fontWeight: 'bold' }}>Nanny not found</h1>
                            <p>The requested nanny does not exist.</p>
                        </Row>
                    </Container>
                </section>
                <Footer />
            </div>
        );
    }

    /*For basic information*/
    // get current time
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    // get opening and closing hour
    let timeParts = currentNanny.startTime.split(':');
    const startHour = parseInt(timeParts[0], 10) + parseFloat(timeParts[1]) / 60;
    timeParts = currentNanny.endTime.split(':');
    const endHour = parseInt(timeParts[0], 10) + parseFloat(timeParts[1]) / 60;

    // Check if currently open or closed. Then display different text accordingly
    const openOrCloseText = (startHour <= currentHour && currentHour <= endHour)
        ? <span style={{ color: "#008000" }}>Open until {currentNanny.endTime}</span>
        : (
            // Use a fragment for the else branch so both spans are returned together
            <>
                <span style={{ color: "#FF0000" }}>Closed</span>
                <span>. Open tomorrow from {currentNanny.startTime}</span>
            </>
        );

    // Show booking criteria to book
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowOptions = () => setShow(true);

    return (
        <div className="min-h-screen">
            <Header />

            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/results">Nannies</Breadcrumb.Item>
                            <Breadcrumb.Item active>{currentNanny.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>

                    {/*basic information here*/}
                    <Row className="text-start g-5 mt-2">
                        <h1 style={{ fontWeight: 'bold' }}>{currentNanny.name}</h1>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>{currentNanny.rating}</span>
                            <Star fill="orange" strokeWidth={0} size={12} style={{ marginBottom: '0.25rem' }} />
                            ({currentNanny.numberOfRating}) . {openOrCloseText} 
                            . <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{currentNanny.address + ', ' + currentNanny.district}</span>
                        </p>
                    </Row>

                    {/*photos here*/}
                    <Row>
                        <Carousel>
                            {Array.from({ length: 3 }, (_, _index) => {
                                return (
                                    <Carousel.Item key={_index}>
                                        <img src={currentNanny.photos} alt={`Photo ${_index + 1}`} className="d-block w-100" />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </Row>

                    <Row className="text-start g-5 mt-2">
                        <Col lg={8}>
                            {/*services here*/}
                            <Row>
                                <h3 style={{ fontWeight: 'bold' }}>Services</h3>
                                {currentNanny.services.map(skill => (
                                    <p>{skill}</p>
                                ))}
                            </Row>

                            {/*additional information here*/}
                            <Row className="mt-2">
                                <h3 style={{ fontWeight: 'bold' }}>Additional Info</h3>
                                {currentNanny.additionalInfo.map(item => (
                                    <p>{item}</p>
                                ))}
                            </Row>
                        </Col>
                        <Col lg={4}>
                        {/** Show options here */}
                            <Card>
                                <Card.Body>
                                    <h1 style={{ fontWeight: 'bold' }}>{currentNanny.name}</h1>
                                    <p>
                                        <span style={{ fontWeight: 'bold' }}>{currentNanny.rating}</span>
                                        <Star fill="orange" strokeWidth={0} size={12} style={{ marginBottom: '0.25rem' }} />
                                        ({currentNanny.numberOfRating}) . {openOrCloseText}
                                        . <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{currentNanny.address + ', ' + currentNanny.district}</span>
                                    </p>
                                    <Button variant="primary" size="lg" className="d-flex align-items-center gap-2 ms-sm-auto"
                                    onClick={handleShowOptions}>
                                    Book now
                                    </Button>
                                    <hr />

                                    {/** TODO: booking result and checkout here */}

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </div>
    );
}

export default Detail;
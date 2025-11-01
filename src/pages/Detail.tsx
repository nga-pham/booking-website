import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import nannies from "../nannies.json";
import { Container, Row, Carousel, Col, Card, Button, Breadcrumb, Modal, ListGroup, Form } from "react-bootstrap";
import { Star } from 'lucide-react';
import { useState } from 'react';

interface chosenOptionProps {
    services: string[];
    additionalInfo: string[];
    startTime: "";
    endTime: "";
}

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

    // Options that user choose when booking
    const [chosenOption, setChosenOption] = useState<chosenOptionProps | null>({services: [], additionalInfo: [], startTime: "", endTime: ""})
    let choosenServicesArray = new Array()
    const addNewService = (service) => {
        choosenServicesArray.push(service)
        console.log(service)
    console.log(choosenServicesArray)

    }

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
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Options</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h3 className="mt-2">Services</h3>
                                            <ListGroup>
                                                {currentNanny.services.map(service => (
                                                    <ListGroup.Item action variant="light" onClick={() => addNewService(service)}>
                                                        {service}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            <h3 className="mt-2">Additional Information</h3>
                                            <ListGroup>
                                                {currentNanny.additionalInfo.map(info => (
                                                    <ListGroup.Item action variant="light">
                                                        {info}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            <h3 className="mt-2">Select time</h3>
                                            <p>From <input type="time" id="start" name="start" /> to <input type="time" id="end" name="end" /></p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {/** TODO: booking result and checkout here */}
                                    <Form>
                                        
                                    </Form>
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
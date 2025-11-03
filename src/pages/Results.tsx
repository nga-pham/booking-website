import { Calendar, ChevronRight, Rows4, Search, Sparkles, Star, Timer } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumb, Button, Card, CardGroup, Col, Container, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import DropdownItem, { categoryIconMap } from '../components/ui/SearchDropdownItem';
import servicesData from "../data/partners.json";
import nannies from "../nannies.json";
import { districts } from "../lib/utils";


const Results = () => {
    // get selected service from landing page
    const location = useLocation();
    const { state } = location as any; // Destructure the state object from location : {category : string[], date, startTime, endTime }

    // Choose categories from dropdown
    // Extract all unique categories from the services data
    const allCategories = servicesData.flatMap(venue => venue.categories);
    const uniqueCategories = [...new Set(allCategories)].sort();
    // set selected category
    const [selectedCat, setSelectedCat] = useState<string>(() =>
        state?.category && state.category.length === 1 ? state.category[0] : "All treatments and venues"
    );
    const changeSelectedCategory = (category: string) => setSelectedCat(category);


    // Get selected date from landing page
    const [selectedDate, setSelectedDate] = useState<Date | null>(state?.date ? new Date(state.date) : null);
    const changeDate = (value: Date | null) => setSelectedDate(value);

    // Get selected time range from landing page
    const [selectedStartTime, setSelectedStartTime] = useState<number>(state?.startTime ?? 0);
    const [selectedEndTime, setSelectedEndTime] = useState<number>(state?.endTime ?? 86400);
    const changeStartTime = (timeNumber: number) => setSelectedStartTime(timeNumber);
    const changeEndTime = (timeNumber: number) => setSelectedEndTime(timeNumber);

    // add label and handle change for choosing name
    const [nameValue, setNameValue] = useState<string>(""); // Initial value for the name
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value)
    };

    // add label for chosing range of experiences
    const [rangeExpValue, setRangeExpValue] = useState<number>(1); // Initial value for the range
    const handleRangeExpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeExpValue(Number(event.target.value))
    };

    // add label and hanlde change for choosing available time
    const [rangeStartTimeValue, setRangeStartTimeValue] = useState<string>('07:00'); // Initial value for the start time
    const handleRangeStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeStartTimeValue(event.target.value)
    }
    const [rangeEndTimeValue, setRangeEndTimeValue] = useState<string>('22:00'); // Initial value for the end time
    const handleRangeEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeEndTimeValue(event.target.value)
    }

    // add label and handle change for choosing range of ratings
    const [rangeRatingValue, setRangeRatingValue] = useState<number>(1); // Initial value for the range
    const handleRangeRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeRatingValue(Number(event.target.value))
    };

    // add label and handle change for choosing districts


    // go to detail page to book
    const navigate = useNavigate();
    const goToDetail = (nannyIdx: number) => {
        navigate(`/results/${nannyIdx}`)
    }

    return (
        <div className="min-h-screen">
            {/*header*/}
            <Header />

            {/*result here*/}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5 mt-2">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Vendors</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    
                    {/* previous search criteria */}
                    <Row className="mt-2 align-items-center">
                        <Form className="w-100">
                            <div className="d-flex w-100 align-items-center rounded-pill bg-white shadow-sm p-2">
                                {/*input group to the left*/}
                                <InputGroup className=" flex-grow-1">
                                    {/*list services*/}
                                    <InputGroup.Text className="border-0 bg-transparent">
                                        <Search />
                                    </InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {selectedCat}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            className="p-2 shadow-lg border"
                                            style={{
                                                zIndex: 9999,
                                                minWidth: "320px",
                                                backgroundColor: "white"
                                            }}
                                        >
                                            <DropdownItem icon={Rows4} category="All treatments and venues" />
                                            <hr />
                                            {uniqueCategories.map((category, index) => {
                                                const Icon = categoryIconMap[category] || Sparkles;
                                                return (
                                                    <DropdownItem key={index} icon={Icon} category={category}
                                                        onClick={() => changeSelectedCategory(category)}
                                                    />
                                                )
                                            }
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    {/*date picker*/}
                                    <div className="vr"></div> {/* This creates the vertical line */}
                                    <InputGroup.Text className="border-0 bg-transparent">
                                        <Calendar />
                                    </InputGroup.Text>
                                    <div className="mt-1">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={changeDate}
                                            className="form-control border-0 bg-white"
                                            dateFormat="dd-MM-yyyy"
                                        />
                                    </div>

                                    {/*time picker*/}
                                    <div className="vr"></div> {/* This creates the vertical line */}
                                    <InputGroup.Text className="border-0 bg-transparent">
                                        <Timer />
                                    </InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id="dropdown-basic" className="no-outline-dropdown" style={{ width: '200px' }}>
                                            Any time
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{ width: '400px' }} >
                                            <div className="p-3 d-flex flex-row">
                                                <span className="mt-1">From</span>&nbsp;&nbsp;
                                                <TimePicker
                                                    start="00:00"
                                                    end="23:00"
                                                    step={60}
                                                    value={selectedStartTime}
                                                    onChange={changeStartTime}
                                                />
                                                &nbsp;&nbsp;<span className="mt-1">To</span>&nbsp;&nbsp;
                                                <TimePicker
                                                    start="01:00"
                                                    end="24:00"
                                                    step={60}
                                                    value={selectedEndTime}
                                                    onChange={changeEndTime}
                                                />
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </InputGroup>

                                {/*button to the right*/}
                                <div className="vr"></div>
                                &nbsp;&nbsp;
                                <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                                    style={{ backgroundColor: 'black', color: "white" }}
                                >
                                    Search <ChevronRight size={20} />
                                </Button>
                            </div>
                        </Form>
                    </Row>
                    
                    <Row className="g-5 mt-2">

                        {/*filter*/}
                        <Col lg={4} >
                            <Container style={{ backgroundColor: "#F8F9FA" }}>
                                <Row className="align-items-start text-start justify-content-start p-3">
                                    <h4 className="mb-3 mt-1">Name</h4>
                                    <Form.Group className="w-100">
                                        <Form.Control type="text" placeholder="Enter name" value={nameValue} onChange={handleNameChange} className="w-100" />
                                    </Form.Group>
                                </Row>
                                <Row className="align-items-start text-start justify-content-start p-3">
                                    <h4 className="mb-3 mt-1">Experiences</h4>
                                    <Form.Group className="w-100">
                                        <Form.Range min={1} max={10} value={rangeExpValue} onChange={handleRangeExpChange} className="w-100" />
                                        <Form.Label className="d-block">Minimum {rangeExpValue} years</Form.Label>
                                    </Form.Group>
                                </Row>

                                <Row className="align-items-start text-start justify-content-start p-3">
                                    <h4 className="mb-3 mt-1">Available time</h4>
                                    <Form.Group className="w-100">
                                        <Form.Label className="d-block">From:</Form.Label>
                                        <Form.Control type="time" value={rangeStartTimeValue} onChange={handleRangeStartTimeChange} className="w-100 mb-2" />
                                        <Form.Label className="d-block">To:</Form.Label>
                                        <Form.Control type="time" value={rangeEndTimeValue} onChange={handleRangeEndTimeChange} className="w-100" />
                                    </Form.Group>
                                </Row>

                                <Row className="align-items-start text-start justify-content-start p-3">
                                    <h4 className="mb-3 mt-1">Rating</h4>
                                    <Form.Group className="w-100">
                                        <Form.Range min={1} max={5} value={rangeRatingValue} step={0.1} onChange={handleRangeRatingChange} className="w-100" />
                                        <Form.Label className="d-block">Minimum {rangeRatingValue} stars</Form.Label>
                                    </Form.Group>
                                </Row>

                                {districts.length > 0 && (
                                    <Row className="align-items-start text-start justify-content-start p-3">
                                        <h4 className="mb-3 mt-1">District</h4>
                                        <Form.Group className="w-100">
                                            {districts.map(district => (
                                                <Form.Check label={district} value={district} />
                                            ))}
                                        </Form.Group>
                                    </Row>
                                )}

                                <Form.Group className="w-100">
                                    <Button variant="info">Filter</Button>
                                    <Button variant="danger" className="ms-2">Reset</Button>
                                </Form.Group>
                            </Container>
                        </Col>

                        {/*results from filter and search*/}
                        <Col lg={8}>
                            <CardGroup>
                                {nannies.map((nanny, _idx) => (
                                    <Card key={_idx} className="m-2" style={{ minWidth: '18rem' }}>
                                        <Card.Img variant="top" src={nanny.photos} />
                                        <Card.Body style={{textAlign: 'left'}}>
                                            <Card.Title>
                                                <p style={{ color: '#000'}}>{nanny.name}</p>
                                            </Card.Title>
                                            <Card.Text style={{ color: '#000', fontSize: '1rem', fontWeight: 'bold' }}>
                                                {nanny.rating}
                                                    <Star fill="orange" strokeWidth={0} size={12} style={{ marginBottom: '0.25rem' }} />
                                                    ({nanny.numberOfRating})
                                            </Card.Text> 
                                            <Card.Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{`${nanny.address ? nanny.address : ""}${nanny.district ? `, ${nanny.district}` : ""}`}</Card.Text>
                                            <Card.Text>{nanny.experience} years experience</Card.Text>
                                            <Card.Text>
                                                {nanny.services.map(skill => (
                                                    <span key={skill} style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', fontSize: '0.875rem' }}>{skill}</span>
                                                ))}
                                            </Card.Text>
                                            <Button variant="info" onClick={() => goToDetail(_idx)}>View detail</Button>
                                            <div className="ml-2 mt-2"><Button variant="light">Book now</Button></div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </CardGroup>
                        </Col>
                    </Row>
                    {/*footer*/}
                    <Footer />
                </Container>
            </section>

        </div>
    );
};

export default Results;
import { useEffect, useState, } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchForm from '../components/SearchForm';
import MyBreadCrumb from '../components/ui/MyBreadCrumb';
import ResultList from "../components/ResultList";
import partnerData from "../data/partners.json";

const Results = () => {
    /* Get search criteria from Landing page */
    // get selected service, date and time from landing page
    const location = useLocation();
    let { state } = location as any; // Destructure the state object from location : {category : string[], date, startTime, endTime }
    // Use case 1.1: handle error: when there is no state
    if (!state) {
        const navigate = useNavigate();
        navigate("*");
        return null;
    }

    // Extract all unique categories from the services data
    const allCategories = partnerData.flatMap(venue => venue.categories);
    const uniqueCategories = [...new Set(allCategories)].sort();

    // If no search in landing page => reset to initial searching criteria
    // and the data is not filtered
    const [filteredData, setFilteredData] = useState<any[]>(partnerData)

    // Use case 1: filter data based on search from landing page
    const handleInitialSearch = (category, startTime, endTime) => {
        let tempData: any[] = []
        partnerData.map(partner => {
            const { categories } = partner
            category.map(cat => {
                categories.map(item => {
                    if (item === cat) tempData.push(partner)
                })
            })
        })

        tempData = Array.from(new Set(tempData)).filter(item => {
            const startTimeInDate = new Date(new Date(`1970-01-01T${startTime}Z`))
            const startTimeInSeconds = startTimeInDate.getUTCHours() * 3600 + startTimeInDate.getUTCMinutes() * 60
            const endTimeInDate = new Date(new Date(`1970-01-01T${endTime}Z`))
            const endTimeInSeconds = endTimeInDate.getUTCHours() * 3600 + endTimeInDate.getUTCMinutes() * 60
            if (startTime <= startTimeInSeconds && endTime >= endTimeInSeconds) return item
        })
        setFilteredData(tempData)
    }

    /* Use case 2: Get search criteria from Result page */


    useEffect(() => {
        const { category, startTime, endTime } = state
        handleInitialSearch(category, startTime, endTime)
    }, [])

    // add label and handle change for choosing name
    // const [nameValue, setNameValue] = useState<string>(""); // Initial value for the name
    // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNameValue(event.target.value)
    // };

    // // add label for chosing range of experiences
    // const [rangeExpValue, setRangeExpValue] = useState<number>(1); // Initial value for the range
    // const handleRangeExpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRangeExpValue(Number(event.target.value))
    // };

    // // add label and hanlde change for choosing available time
    // const [rangeStartTimeValue, setRangeStartTimeValue] = useState<string>('07:00'); // Initial value for the start time
    // const handleRangeStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRangeStartTimeValue(event.target.value)
    // }
    // const [rangeEndTimeValue, setRangeEndTimeValue] = useState<string>('22:00'); // Initial value for the end time
    // const handleRangeEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRangeEndTimeValue(event.target.value)
    // }

    // // add label and handle change for choosing range of ratings
    // const [rangeRatingValue, setRangeRatingValue] = useState<number>(1); // Initial value for the range
    // const handleRangeRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRangeRatingValue(Number(event.target.value))
    // };

    // add label and handle change for choosing districts

    return (
        <div className="min-h-screen">
            {/*header*/}
            <Header />

            {/*result here*/}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5 mt-2">
                        <MyBreadCrumb isList={true} />
                    </Row>

                    {/* previous search criteria */}
                    <Row className="mt-2">
                        <SearchForm category={state.category} date={state.date} startTime={state.startTime} endTime={state.endTime} />
                    </Row>

                    <Row className="g-5 mt-2">

                        {/*filter*/}
                        {/* <Col lg={4} >
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
                        </Col> */}

                        {/*results from filter and search*/}
                        <Col lg={8}>
                            {filteredData.length > 0 ? <ResultList filteredData={filteredData} />
                                :
                                <div className="bg-white rounded-3 shadow-sm p-5 text-center">
                                    <p className="text-muted mb-0">No venues found matching your criteria.</p>
                                </div>
                            }
                            {/* <ResultList filteredData={filteredData} /> */}
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*footer*/}
            <Footer />
        </div>
    );
};

export default Results;
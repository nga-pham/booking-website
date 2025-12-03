import { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchForm from '../components/SearchForm';
import MyBreadCrumb from '../components/ui/MyBreadCrumb';
import ResultList from "../components/ResultList";
import partnerData from "../data/partners.json";
import { uniqueCategories } from '../lib/utils';

const Results = () => {
    /* Get search criteria from Landing page */
    // get selected service, date and time from landing page
    const location = useLocation();
    const locationState = (location as any).state; // router-provided state: {category : string[], date, startTime, endTime }
    
    // Use case 1.1: handle error: when there is no state
    // Also allow reading search params as a fallback so the route can be opened directly
    const params = new URLSearchParams(location.search);
    const paramCategory = params.get('category'); // comma separated
    const paramStart = params.get('start');
    const paramEnd = params.get('end');

    // capture the location state at mount so later changes (or clearing) won't overwrite
    const initialLocationStateRef = useRef(locationState);

    const initialSearchState = (initialLocationStateRef.current ?? locationState) ?? {
        category: paramCategory ? paramCategory.split(',') : uniqueCategories,
        date: new Date(),
        startTime: paramStart ?? 0,
        endTime: paramEnd ?? 86400
    }

    
    // If no search in landing page => reset to initial searching criteria
    // and the data is not filtered
    const [filteredData, setFilteredData] = useState<any[]>(partnerData)

    // Use case 1: filter data based on search from landing page
    const handleInitialSearch = (categoriesToMatch, startTime, endTime) => {
        // normalize category list
        const wantedCategories = Array.isArray(categoriesToMatch) ? categoriesToMatch : [categoriesToMatch]
        // If the UI uses a human label for "all" (e.g. "All treatments and venues"),
        // expand it to the real list of categories so matching works.
        let normalizedWanted = wantedCategories
        if (normalizedWanted.length === 1 && typeof normalizedWanted[0] === 'string') {
            const label = normalizedWanted[0].toLowerCase()
            if (label.includes('all') || label.includes('treatments') || label.includes('venues')) {
                normalizedWanted = uniqueCategories
            }
        }

        // helper to parse time inputs (either number in seconds or 'HH:MM' string)
        const parseToSeconds = (t: any) => {
            if (typeof t === 'number' && !isNaN(t)) return t
            if (typeof t === 'string') {
                // accept 'HH:MM' or 'HH:MM:SS'
                const parts = t.split(':').map(p => Number(p))
                if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    return (parts[0] * 3600) + (parts[1] * 60) + (parts[2] ? parts[2] : 0)
                }
                const n = Number(t)
                return isNaN(n) ? 0 : n
            }
            return 0
        }

        const reqStart = parseToSeconds(startTime)
        const reqEnd = parseToSeconds(endTime)

        const matched: any[] = []
        partnerData.forEach(partner => {
            const partnerCats = Array.isArray(partner.categories) ? partner.categories : []
            const intersect = partnerCats.some((c: any) => normalizedWanted.includes(c))
            if (intersect) matched.push(partner)
        })

        // remove duplicates and then filter by time availability
        const unique = Array.from(new Set(matched))
        const filteredByTime = unique.filter(item => {
            const pStart = parseToSeconds(item.startTime)
            const pEnd = parseToSeconds(item.endTime)

            // If the user didn't set any time (full day), don't filter by time
            if (reqStart === 0 && reqEnd >= 86400) {
                return true
            }

            // If the user provided a start but left end as the default 'end of day',
            // treat this as "available at that start time" rather than requiring
            // the partner to stay open until midnight.
            if (reqEnd >= 86400) {
                // Treat requested end as "any time after start" — accept any partner
                // that has availability after the requested start time.
                return pEnd > reqStart
            }

            // Normal case: partner must cover the whole requested slot
            return pStart <= reqStart && pEnd >= reqEnd
        })

        setFilteredData(filteredByTime)
    }

    /* Use case 2: Get search criteria from Result page */


    useEffect(() => {
        // If we navigated here with state, prefer the captured initial state.
        // If not, fall back to URL params.
        const { category, startTime, endTime } = initialSearchState
        handleInitialSearch(category, startTime, endTime)
    }, [location.search, locationState])

    // Log filteredData length when it changes to help debugging
    useEffect(() => {
        console.log('Results: filteredData length =', filteredData.length, 'locationState =', locationState)
    }, [filteredData.length, locationState])

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
                        <SearchForm category={initialSearchState.category} date={initialSearchState.date} startTime={initialSearchState.startTime} endTime={initialSearchState.endTime} />
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
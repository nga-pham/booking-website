import { Calendar, ChevronRight, Rows4, Search, Sparkles, Timer } from "lucide-react";
import { useState } from "react";
import { Button, Container, Dropdown, Form, InputGroup, Row, Col } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DropdownItem, { categoryIconMap } from '../components/ui/SearchDropdownItem';
import partnersData from "../data/partners.json";
import { isEndTimeBeforeStartTime } from "../lib/utils"

// interface of data to pass to result page
interface resultsStateProps {
    category: string[];
    date: Date | null;
    startTime: number | 0;
    endTime: number | 86400;    // end time at 24:00 in seconds
}

const HeroSection = () => {

    // Choose categories from dropdown
    // Extract all unique categories from the services data
    const allCategories = partnersData.flatMap(venue => venue.categories);
    const uniqueCategories = [...new Set(allCategories)].sort();
    // set selected category
    const [selectedCat, setSelectedCat] = useState<string>("All treatments and venues");
    const changeSelectedCategory = (category: string) => {
        setSelectedCat(category);
    }

    // Choose date range
    const [date, setDate] = useState<Date | null>(new Date());
    const changeDate = (value: Date | null) => {
        setDate(value);
    };

    // choose time range (use seconds as numeric values)
    const [startTime, setStartTime] = useState<number>(0); // 00:00 => 0 seconds
    const changeStartTime = (timeNumber: any) => {
        setStartTime(timeNumber);
    }
    const [endTime, setEndTime] = useState<number>(86400); // 24:00 => 24*3600 = 86400 seconds
    const changeEndTime = (timeNumber: any) => {
        setEndTime(timeNumber);
    }

    // Pass data to results page
    const navigate = useNavigate();
    let tempCategoryArray = [selectedCat]
    if (selectedCat === "All treatments and venues") {
        tempCategoryArray = Array.from(uniqueCategories);
        }
    
    
    const gotoResults = () => {
        // if end time is before start time, show error toast
        if (isEndTimeBeforeStartTime(startTime, endTime)) {
            toast.error("Invalid time range", {
                description: "End time must be after start time"
            });
        // else go to result page
        } else {
            const resultsState: resultsStateProps = {
                // all categories or just the selected one
                "category": tempCategoryArray,
                // cast date to Date to satisfy interface (date state remains Date | null)
                "date": date as Date,
                "startTime": startTime,
                "endTime": endTime,
            }
            navigate("/results", { state: resultsState })
        }
    }

    return (
        <section className="py-5 hero">
            <Container>
                <Row className="mt-5 align-items-center">
                    <h1 className="display-3 fw-bold mb-3">Book local beauty and wellness services</h1>
                    <p className="fs-4 mb-5 text-dark"><strong>400K+</strong> appointments booked today</p>

                    <div className="bg-white rounded-pill shadow-lg p-3">
                        <Row className="g-0">
                            {/*list services*/}
                            <Col md={4} className="border-end border-2 border-light">
                                    <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        <Search size={20} className="text-muted" style={{ marginRight: '0.5rem' }} />
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
                                        <DropdownItem icon={Search} category="All treatments and venues"
                                            onClick={() => changeSelectedCategory("All treatments and venues")}
                                        />
                                            <hr className="my-2 border-border" />
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
                            </Col>

                            {/*date picker*/}
                            <Col md={3} className="border-end border-2 border-light">
                                <div className="d-flex align-items-center ps-4">
                                    <Calendar size={20} className="text-muted" />
                                    <DatePicker
                                        selected={date}
                                        onChange={changeDate}
                                        className="form-control border-0 bg-white"
                                        dateFormat="dd-MM-yyyy"
                                        minDate={new Date()} // Disables all previous days
                                    />
                                </div>
                            </Col>

                            {/*time picker*/}
                            <Col md={3} className="border-end border-2 border-light">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="button"
                                        className="d-flex align-items-center gap-2 border-0 bg-white w-100 ps-4 py-2"
                                        style={{ cursor: "pointer", fontSize: "1rem" }}
                                    >
                                        <Timer size={20} className="text-muted" />
                                        <span className="text-dark">Any time</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ minWidth: '320px' }} >
                                        <div className="p-3 d-flex flex-row">
                                            <span className="mt-1">From</span>&nbsp;&nbsp;
                                            <TimePicker
                                                start="00:00"
                                                end="23:00"
                                                step={60}
                                                value={startTime}
                                                onChange={changeStartTime}
                                            />
                                            &nbsp;&nbsp;<span className="mt-1">To</span>&nbsp;&nbsp;
                                            <TimePicker
                                                start="01:00"
                                                end="24:00"
                                                step={60}
                                                value={endTime}
                                                onChange={changeEndTime}
                                            />
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                            {/*button to the right*/}
                            <Col md={2}>
                                <Button variant="primary" size="lg"
                                    className="d-flex align-items-center ml-2 justify-content-center gap-2 py-2 rounded-pill"
                                    style={{ backgroundColor: 'black', color: "white" }}
                                    onClick={gotoResults}>
                                    Search <ChevronRight size={20} />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
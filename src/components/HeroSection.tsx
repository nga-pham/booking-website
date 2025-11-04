import { Calendar, ChevronRight, Rows4, Search, Sparkles, Timer } from "lucide-react";
import { useState } from "react";
import { Button, Container, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DropdownItem, { categoryIconMap } from '../components/ui/SearchDropdownItem';
import servicesData from "../data/partners.json";


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
    const allCategories = servicesData.flatMap(venue => venue.categories);
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
    const resultsState: resultsStateProps = {
        // all categories or just the selected one
        "category": tempCategoryArray,
        //"category": selectedCat === "All treatments and venues" ? Array.from(uniqueCategories) : [selectedCat],
        // cast date to Date to satisfy interface (date state remains Date | null)
        "date": date as Date,
        "startTime": startTime, 
        "endTime": endTime,
    }

    const isEndTimeBeforeStartTime = (start: number, end: number): boolean => {
        return (end - start) <= 0;
    }
    
    const gotoResults = () => {
        // if end time is before start time, show error toast
        if (isEndTimeBeforeStartTime(startTime, endTime)) {
            toast.error("Invalid time range", {
                description: "End time must be after start time"
            });
        // else go to result page
        } else {
            navigate("/results", { state: resultsState })
        }
    }

    return (
        <section className="py-5 hero">
            <Container>
                <Row className="mt-5 align-items-center">
                    <div className="mb-4">
                        <h1 className="display-3 fw-bold mb-3">Book local beauty and wellness services</h1>
                    </div>
                            <h3 className="mb-5 fw-medium"><strong>400K+</strong> appointments booked today</h3>
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
                                        selected={date}
                                        onChange={changeDate}
                                        className="form-control border-0 bg-white"
                                        dateFormat="dd-MM-yyyy"
                                        minDate={new Date()} // Disables all previous days
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
                            </InputGroup>

                            {/*button to the right*/}
                            <div className="vr"></div> {/* This creates the vertical line */}
                            &nbsp;&nbsp;
                            <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
                                style={{ backgroundColor: 'black', color: "white" }}
                                onClick={gotoResults}>
                                Search <ChevronRight size={20} />
                            </Button>
                        </div>
                    </Form>

                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
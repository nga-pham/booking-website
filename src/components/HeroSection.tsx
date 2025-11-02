import { useState } from "react";
import { Container, Row, Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { ChevronRight, Search, Calendar, Timer, Eye, HandHeart, Sparkles, Bath, Palette, Flame, Hand, Rows4 , LucideIcon } from "lucide-react";
import moment from 'moment'; 
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-bootstrap-time-picker';
import servicesData from "../data/services.json";

// interface of data to pass to result page
interface resultsStateProps {
    category: string[];
    date: string;
}

// interface of dropdown items
interface DropdownItemProps {
    icon: LucideIcon;
    category: string;
    onClick?: () => void;
}
// Map categories to lucide-react icons
const categoryIconMap: Record<string, LucideIcon> = {
    "Eyebrows and eyelashes": Eye,
    "Massage": HandHeart,
    "Nail": Hand,
    "Body": Sparkles,
    "Spa packages": Bath,
    "Makeup": Palette,
    "Waxing": Flame,
};

const HeroSection = () => {

    // Choose services from dropdown
    // Extract all unique categories from the services data
    const allCategories = servicesData.flatMap(venue => venue.categories);
    const uniqueCategories = [...new Set(allCategories)].sort();
    // set selected category
    const [selectedCat, setSelectedCat] = useState<string>("All treatments and venues");
    const changeSelectedCategory = (category: string) => {
        setSelectedCat(category);
    }
    const DropdownItem = ({ icon: Icon, category }: DropdownItemProps) => {
        return (
            <Dropdown.Item onClick={() => changeSelectedCategory(category)}>
                <Icon className="me-2" />{category}
            </Dropdown.Item>
        )
    }
    

    // Choose date range
    const [date, setDate] = useState<Date | null>(new Date());
    const changeDate = (value: Date | null) => {
        setDate(value);
    };
    // Format date for display as "dd-mm-yyyy"
    const formattedDisplayDate = date ? moment(date).format('DD-MM-YYYY') : '';

    // choose time range
    const [startTime, setStartTime] = useState('00:00')
    const changeStartTime = (timeNumber: any) => {
        setStartTime(timeNumber)
    }
    const [endTime, setEndTime] = useState("23:00")
    const changeEndTime = (timeNumber: any) => {
        setEndTime(timeNumber)
    }

    // Pass data to results page
    const navigate = useNavigate();
    const resultsState: resultsStateProps = {
        // all categories or just the selected one
        "category": selectedCat === "All treatments and venues" ? Array.from(uniqueCategories) : [selectedCat],
        "date": formattedDisplayDate,
    }
    // TODO: if one property is empty, display tooltip to remind user

    // else go to result page
    const gotoResults = () => { navigate("/results", { state: resultsState }) }
    console.log(resultsState);

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
                                        <DropdownItem icon={Rows4 } category="All treatments and venues" />
                                        {uniqueCategories.map((category, index) => {
                                            const Icon = categoryIconMap[category] || Sparkles;
                                            return (
                                                <DropdownItem key={index} icon={Icon} category={category} />
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
import { useState } from "react";
import { Container, Row, Col, Button, CardGroup, Form, InputGroup, Dropdown } from "react-bootstrap";
import { ChevronRight, Plus, Minus, Search, MapPinned, Calendar, Timer } from "lucide-react";
import serviceIcon from '../assets/service-icon.png';
import HeroCard from "../components/ui/HeroCard";
import moment from 'moment'; 
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-bootstrap-time-picker';

// interface of data to pass to result page
interface serviceProps {
    id: string;
    title: string;
}

interface resultsStateProps {
    service: serviceProps;
    date: string;
    numOfBabies: number;
}

const selectedServices = [
    { id: "conf-nanny", title: "Confinement Nanny" },
    { id: "adhoc", title: "One Time / Ad Hoc" },
    { id: "recurring", title: "Recurring / Long-term" },
]

const HeroSection = () => {

    // Choose services from card group
    const [selectedService, setSelectedService] = useState({ id: "", title: "" });

    // Choose date range
    const [selectedDate, setSelectedDate] = useState('');
    const formattedDisplayDate = selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : '';
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
      };

    const [date, setDate] = useState(new Date());
    const changeDate = (value) => {
        setDate(value);
    };
    const [startTime, setStartTime] = useState(0)
    const changeStartTime = (timeNumber) => {
        setStartTime(timeNumber)
    }
    const [endTime, setEndTime] = useState("23:00")
    const changeEndTime = (timeNumber) => {
        setEndTime(timeNumber)
    }

    // Choose number of babies
    const [numOfBabies, setNumOfBabies] = useState(1);
    const incrementBabies = () => setNumOfBabies(numOfBabies + 1);
    const decrementBabies = () => setNumOfBabies(num => {
        if (num > 1) {
            return num - 1;
        } else return 1;
    });

    // Pass data to results page
    const navigate = useNavigate();
    const resultsState: resultsStateProps = {
        "service": selectedService,
        "date": formattedDisplayDate,
        "numOfBabies": numOfBabies
    }
    // TODO: if one property is empty, display tooltip to remind user

    // else go to result page
    const gotoResults = () => { navigate("/results", { state: resultsState }) }


    return (
        <section className="py-5 hero">
            <Container>
                <Row className="mt-5 align-items-center">
                    <div className="mb-4">
                        <h1 className="display-3 fw-bold mb-3">Book local beauty and wellness services</h1>
                    </div>
                            <h3 className="mb-5 fw-medium"><b>400K+</b> appointments booked today</h3>
                    <Form className="w-100">
                        <div className="d-flex w-100 align-items-center rounded-pill bg-white shadow-sm p-2">
                            {/*input group to the left*/}
                            <InputGroup className=" flex-grow-1">

                                {/*list services*/}
                                <InputGroup.Text className="border-0 bg-transparent">
                                    <Search />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="All treatments and venues"
                                    className="form-control border-0 bg-transparent"
                                    style={{ flex: '0 0 480px', width: '480px', maxWidth: '600px' }} // ensure it does not grow
                                />

                                {/*date picker*/}
                                <div className="vr"></div> {/* This creates the vertical line */}
                                <InputGroup.Text className="border-0 bg-transparent">
                                    <Calendar />
                                </InputGroup.Text>
                                <div className="mt-1">
                                    <DatePicker selected={date} onChange={changeDate} className="form-control border-0 bg-white" />
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
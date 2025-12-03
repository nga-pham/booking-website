import { Calendar, ChevronRight, Rows4, Search, Sparkles, Timer } from 'lucide-react';
import { useState } from 'react';
import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import { toast } from 'sonner';
import DropdownItem, { categoryIconMap } from '../components/ui/SearchDropdownItem';
import partnerData from "../data/partners.json";
import { isEndTimeBeforeStartTime } from "../lib/utils";
import { uniqueCategories } from '../lib/utils';

// props is state from landing page
const SearchForm = (props) => {
    // Choose categories from dropdown
    // set selected categories
    // selectedCat is text from dropdown, while selectedCategories is different; it's all the categories chosen
    const [selectedCat, setSelectedCat] = useState<string>(() =>
        props.category && props.category.length === 1 ? props.category[0] : "All treatments and venues"
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
        props.category && props.category.length === 1 ? props.category : Array.from(uniqueCategories)
    )
    const changeSelectedCategories = (category) => {
        setSelectedCat(category)
        if (selectedCat === "All treatments and venues") {
            setSelectedCategories(Array.from(uniqueCategories))
        } else setSelectedCategories([selectedCat])
    };

    // Get selected date from landing page and change when user selects a new date
    const [selectedDate, setSelectedDate] = useState<Date | null>(props.date ? new Date(props.date) : new Date());
    const changeDate = (value: Date | null) => setSelectedDate(value);

    // Get selected time range from landing page and change when user selects a new time range
    const [selectedStartTime, setSelectedStartTime] = useState<number>(props?.startTime ?? 0);
    const [selectedEndTime, setSelectedEndTime] = useState<number>(props?.endTime ?? 86400);
    const changeStartTime = (timeNumber: number) => setSelectedStartTime(timeNumber);
    const changeEndTime = (timeNumber: number) => setSelectedEndTime(timeNumber);

    // update list based on change
    const updateList = () => {
        // if end time is before start time, show error toast
        if (isEndTimeBeforeStartTime(selectedStartTime, selectedEndTime)) {
            toast.error("Invalid time range", {
                description: "End time must be after start time"
            });
            // else update
        } else {
        }
    }

    return (
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
                                onClick={() => changeSelectedCategories("All treatments and venues")}
                            />
                            <hr className="my-2 border-border" />
                            {uniqueCategories.map((category, index) => {
                                const Icon = categoryIconMap[category] || Sparkles;
                                return (
                                    <DropdownItem key={index} icon={Icon} category={category}
                                        onClick={() => changeSelectedCategories(category)}
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
                        <Calendar size={20} className="text-muted ms-2" />
                        <DatePicker
                            selected={selectedDate}
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
                            <Timer size={20} className="text-muted ms-2" />
                            <span className="text-dark">Any time</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: '320px' }} >
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
                </Col>

                {/*button to the right*/}
                <Col md={2}>
                    <Button variant="primary" size="lg"
                        className="d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill"
                        style={{ backgroundColor: 'black', color: "white", marginLeft: '2rem' }}
                        onClick={updateList}>
                        Search <ChevronRight size={20} />
                    </Button>
                </Col>
            </Row>
        </div>
        // <Form className="w-100">
        //     <div className="d-flex w-100 align-items-center rounded-pill bg-white shadow-sm p-2">
        //         {/*input group to the left*/}
        //         <InputGroup className=" flex-grow-1">
        //             {/*list services*/}
        //             <InputGroup.Text className="border-0 bg-transparent">
        //                 <Search />
        //             </InputGroup.Text>
        //             <Dropdown>
        //                 <Dropdown.Toggle variant="light" id="dropdown-basic">
        //                     {selectedCat}
        //                 </Dropdown.Toggle>
        //                 <Dropdown.Menu
        //                     className="p-2 shadow-lg border"
        //                     style={{
        //                         zIndex: 9999,
        //                         minWidth: "320px",
        //                         backgroundColor: "white"
        //                     }}
        //                 >
        //                     <DropdownItem icon={Rows4} category="All treatments and venues"
        //                         onClick={() => changeSelectedCategories("All treatments and venues")}
        //                     />
        //                     <hr />
        //                     {uniqueCategories.map((category, index) => {
        //                         const Icon = categoryIconMap[category] || Sparkles;
        //                         return (
        //                             <DropdownItem key={index} icon={Icon} category={category}
        //                                 onClick={() => changeSelectedCategories(category)}
        //                             />
        //                         )
        //                     }
        //                     )}
        //                 </Dropdown.Menu>
        //             </Dropdown>

        //             {/*date picker*/}
        //             <div className="vr"></div> {/* This creates the vertical line */}
        //             <InputGroup.Text className="border-0 bg-transparent">
        //                 <Calendar />
        //             </InputGroup.Text>
        //             <div className="mt-1">
        //                 <DatePicker
        //                     selected={selectedDate}
        //                     onChange={changeDate}
        //                     className="form-control border-0 bg-white"
        //                     dateFormat="dd-MM-yyyy"
        //                 />
        //             </div>

        //             {/*time picker*/}
        //             <div className="vr"></div> {/* This creates the vertical line */}
        //             <InputGroup.Text className="border-0 bg-transparent">
        //                 <Timer />
        //             </InputGroup.Text>
        //             <Dropdown>
        //                 <Dropdown.Toggle variant="link" id="dropdown-basic" className="no-outline-dropdown" style={{ width: '200px' }}>
        //                     Any time
        //                 </Dropdown.Toggle>

        //                 <Dropdown.Menu style={{ width: '400px' }} >
        //                     <div className="p-3 d-flex flex-row">
        //                         <span className="mt-1">From</span>&nbsp;&nbsp;
        //                         <TimePicker
        //                             start="00:00"
        //                             end="23:00"
        //                             step={60}
        //                             value={selectedStartTime}
        //                             onChange={changeStartTime}
        //                         />
        //                         &nbsp;&nbsp;<span className="mt-1">To</span>&nbsp;&nbsp;
        //                         <TimePicker
        //                             start="01:00"
        //                             end="24:00"
        //                             step={60}
        //                             value={selectedEndTime}
        //                             onChange={changeEndTime}
        //                         />
        //                     </div>
        //                 </Dropdown.Menu>
        //             </Dropdown>

        //         </InputGroup>

        //         {/*button to the right*/}
        //         <div className="vr"></div>
        //         &nbsp;&nbsp;
        //         <Button variant="primary" size="lg" className="d-flex align-items-center ml-2 rounded-pill"
        //             style={{ backgroundColor: 'black', color: "white" }}
        //             onClick={updateList}
        //         >
        //             Search <ChevronRight size={20} />
        //         </Button>
        //     </div>
        // </Form>
    )
}

export default SearchForm;
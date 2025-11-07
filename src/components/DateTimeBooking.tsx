/* 
PSEUDOCODE / PLAN (detailed):
1. Keep boolean state `isOpen` initialized to true so the calendar is visible when the component mounts.
2. Keep `chosenDateTime` state and `changeDate` helper that accepts `Date | null`.
3. Handle `changeDate()` which can provide `Date`, `Date[]`, or `null`.
   - In the handler, accept the union type `Date | Date[] | null`.
   - If the value is an array, pick the first element (or null if empty).
   - Pass a `Date | null` to `changeDate`.
4. After selection, set `isOpen` to false to close the picker.
5. Control `open` prop with `isOpen`; reopen on input click and close on outside click.
6. Preserve existing styles and `showTimeSelect`.
*/

import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";

const DateTimeBooking = ({sendDataToBookingPage }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [chosenDateTime, setChosenDateTime] = useState<Date | null>(new Date());
    const changeDate = (date: Date | Date[] | null) => {
        // Normalize possible array value to a single Date or null
        const normalized: Date | null = Array.isArray(date) ? (date[0] ?? null) : date;
        setChosenDateTime(normalized)
    };

    if (sendDataToBookingPage) {
        useEffect(
            () => {
                sendDataToBookingPage(chosenDateTime)
            }, [chosenDateTime]
        )
    }

    return (
        <div className="text-start mt-5">
            <h3 style={{ fontWeight: 'bold' }}>Date and time</h3>
            <InputGroup>
                <InputGroup.Text>
                    <Calendar />
                </InputGroup.Text>
                <div className="mt-1">
                    <DatePicker
                        selected={chosenDateTime}
                        onChange={(date: Date | Date[] | null) => {
                            changeDate(date);
                            setIsOpen(false); // close after selection
                        }}
                        className="form-control border-0 bg-white"
                        dateFormat="dd-MM-yyyy h:mm aa"
                        open={isOpen} // controlled visibility
                        onInputClick={() => setIsOpen(true)} // reopen on input click
                        onClickOutside={() => setIsOpen(false)} // close on outside click
                        showTimeSelect
                    />
                </div>
            </InputGroup>
        </div>
    )
}

export default DateTimeBooking
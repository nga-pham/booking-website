// type of props are same as ServiceCardProps
interface chosenServiceProps {
    name: string | ""
    duration: number | 0;
    cost: number | 0
}

// used for InformationForm, Booking, BookingResult
interface chosenInfoProps {
    email: string | "",
    name: string | "",
    phoneNumber: string | "",
    address: string | "",
    city: string | "",
    district: string | "",
}
interface chosenOptionProps {
    services: chosenServiceProps[];
    date: Date | null;
    startTime: string | "";
    duration: number | 0
}

export type {
    chosenServiceProps,
    chosenInfoProps
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import servicesData from "../data/partners.json";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Group partners by district
export const districts = Array.from(new Set(servicesData.map(service => service.district)));

// check if end time before or equal to start time, in time range
export const isEndTimeBeforeStartTime = (start: number, end: number): boolean => {
    return (end - start) <= 0;
}


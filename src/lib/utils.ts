import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import partnerData from "../data/partners.json";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Group partners by district
export const districts = Array.from(new Set(partnerData.map(partner => partner.district)));

// check if end time before or equal to start time, in time range
export const isEndTimeBeforeStartTime = (start: number, end: number): boolean => {
    return (end - start) <= 0;
}

export const partnerDataWithId : any[] =  partnerData.map((partner:any, _idx) => ({ ...partner, id: _idx }))

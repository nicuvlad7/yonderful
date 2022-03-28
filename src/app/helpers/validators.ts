import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { timeStringParser } from "./helpers";

export function eventEndTimeValidator(): ValidatorFn {
    return  (eventDates: AbstractControl): ValidationErrors | null => {
    let startDate: Date = eventDates.get('startDate')?.value;
    let endDate: Date = eventDates.get('endDate')?.value;
    let startTime: string = eventDates.get('startTime')?.value;
    let endTime: string = eventDates.get('endTime')?.value;


    if (!startDate || !endDate) return null;

    if (!startTime || !endTime) return null;

    // Crate startDate and endDate objects with complete user input information
    // Additionally, set the seconds and miliseconds to zero to prepare for comparison
    let startTimeDict: { hours: number, minutes: number } = timeStringParser(eventDates.get('startTime')?.value);
    startDate.setHours(startTimeDict.hours, startTimeDict.minutes, 0, 0);

    let endTimeDict: { hours: number, minutes: number } = timeStringParser(eventDates.get('endTime')?.value);
    endDate.setHours(endTimeDict.hours, endTimeDict.minutes, 0, 0);

    if (startDate.getTime() < endDate.getTime()) return null;
    
    eventDates.get('endTime')?.setErrors({ endTimeError: true });

    return { endTimeError: true};
};
}

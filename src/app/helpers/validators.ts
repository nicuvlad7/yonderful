import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { timeStringParser } from "./helpers";

export function eventEndTimeValidator(): ValidatorFn {
    return (eventDates: AbstractControl): ValidationErrors | null => {
        let startDate: Date = eventDates.get('startDate')?.value;
        let endDate: Date = eventDates.get('endDate')?.value;
        let startTime: string = eventDates.get('startTime')?.value;
        let endTime: string = eventDates.get('endTime')?.value;
        
        if (!startDate || !endDate) return null;

        if (!startTime || !endTime) return null;

        eventDates.get('endTime').updateValueAndValidity({ onlySelf: true });

        // Crate startDate and endDate objects with complete user input information
        // Additionally, set the seconds and miliseconds to zero to prepare for comparison
        let startTimeDict: { hours: number, minutes: number } = timeStringParser(eventDates.get('startTime')?.value);
        startDate.setHours(startTimeDict.hours, startTimeDict.minutes, 0, 0);

        let endTimeDict: { hours: number, minutes: number } = timeStringParser(eventDates.get('endTime')?.value);
        endDate.setHours(endTimeDict.hours, endTimeDict.minutes, 0, 0);

        if (startDate.getTime() < endDate.getTime()) return null;

        const error: ValidationErrors = { endTimeError: true };

        eventDates.get('endTime')?.setErrors(error);

        return error;
    };
}

export function eventJoinTimeValidator(): ValidatorFn {
    return (eventDates: AbstractControl): ValidationErrors | null => {
        let startDate: Date = eventDates.get('startDate')?.value;
        let startTime: string = eventDates.get('startTime')?.value;

        let joinDeadlineDate: Date = eventDates.get('joinDeadlineDate')?.value;
        let joinDeadlineTime: string = eventDates.get('joinDeadlineTime')?.value;

        if (!startDate || !joinDeadlineDate) return null;

        if (!startTime || !joinDeadlineTime) return null;

        eventDates.get('joinDeadlineTime').updateValueAndValidity({ onlySelf: true });
        eventDates.get('joinDeadlineDate').updateValueAndValidity({ onlySelf: true });
        
        startDate.setHours(0, 0, 0, 0);
        joinDeadlineDate.setHours(0, 0, 0, 0);

        if (joinDeadlineDate.getTime() > startDate.getTime()) {
            const error: ValidationErrors = { joinDeadlineDateError: true };
            eventDates.get('joinDeadlineDate')?.setErrors(error);
            return error;
        }

        let startTimeDict: { hours: number, minutes: number } = timeStringParser(eventDates.get('startTime')?.value);
        startDate.setHours(startTimeDict.hours, startTimeDict.minutes, 0, 0);

        let joinDeadlineTimeDict: { hours: number, minutes: number } = timeStringParser(eventDates.get('joinDeadlineTime')?.value);
        joinDeadlineDate.setHours(joinDeadlineTimeDict.hours, joinDeadlineTimeDict.minutes, 0, 0);


        if (joinDeadlineDate.getTime() < startDate.getTime()) return null;

        const error: ValidationErrors = { joinDeadlineTimeError: true };

        eventDates.get('joinDeadlineTime')?.setErrors(error);

        return error;

    };
}

export function eventParticipantsIntervalValidator(): ValidatorFn {
    return (participantsInterval: AbstractControl): ValidationErrors | null => {
        const minimumParticipants: string = participantsInterval.get('minimumParticipants')?.value;
        const maximumParticipants: string = participantsInterval.get('maximumParticipants')?.value;

        if (!minimumParticipants || !maximumParticipants) return null;

        const minimum = parseInt(minimumParticipants, 10);
        const maximum = parseInt(maximumParticipants, 10);

        if (minimum <= maximum) return null;

        const error: ValidationErrors = { participantsIntervalError: true };

        participantsInterval.get('maximumParticipants')?.setErrors(error);

        return error;
    }
}

export function joinDeadlineValidator(): ValidatorFn {
    return (joinEvent: AbstractControl): ValidationErrors | null => {
        let today = new Date();
        let currentDate: Date = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
        let currentTime: string = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let joinDeadlineDate: Date = joinEvent.get('joinDeadlineDate')?.value;
        let joinDeadlineTime: string = joinEvent.get('joinDeadlineTime')?.value;

        if (!currentDate || !joinDeadlineDate) return null;

        if (!currentTime || !joinDeadlineTime) return null;

        let currentTimeDict: { hours: number, minutes: number } = timeStringParser(currentTime);
        currentDate.setHours(currentTimeDict.hours, currentTimeDict.minutes, 0, 0);

        let joinDeadlineTimeDict: { hours: number, minutes: number } = timeStringParser(joinDeadlineTime);
        joinDeadlineDate.setHours(joinDeadlineTimeDict.hours, joinDeadlineTimeDict.minutes, 0, 0);


        if (joinDeadlineDate.getDate() == currentDate.getDate() &&
            joinDeadlineDate.getMonth() == currentDate.getMonth() &&
            joinDeadlineDate.getFullYear() == currentDate.getFullYear()) {
            if (joinDeadlineDate.getTime() < currentDate.getTime()) {
                const error: ValidationErrors = { joinTimeError: true };
                joinEvent.get('joinDeadlineTime')?.setErrors(error);
                return error;
            }
        };
        return null;
    };

}

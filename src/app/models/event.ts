import { SafeResourceUrl } from "@angular/platform-browser";
import { EventLocation } from "./event-location";

export interface IEvent {
    id: number,
    categoryId: number,
    hostId: number,
    title: string,
    startingDate: string,
    endingDate: string,
    minimumParticipants: number,
    maximumParticipants: number,
    autoCancel: boolean,
    autoJoin: boolean,
    joinDeadline: string,
    fee: number,
    description: string,
    eventLocation: EventLocation,
    contactEmail: string,
    contactPhone: string,
    tags: string,
    backgroundImage: string
}
export interface UserEvent {
    id: number,
    categoryId: number,
    hostId: number,
    title: string,
    startDate: Date,
    endDate: Date,
    minimumParticipants: number,
    maximumParticipants: number,
    autocancel: boolean,
    autojoin: boolean,
    joinDeadline: Date,
    fee: number,
    description: string,
    eventLocation: {
        location: string,
        locationDetails: string,
        city: string,
        state: string
    },
    contactEmail: string,
    contactMobileNumber: string,
    tags: string,
    backgroundImage: string
}
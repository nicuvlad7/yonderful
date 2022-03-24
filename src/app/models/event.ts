export interface UserEvent {
    id: number,
    categoryId: number,
    hostId: number,
    title: string,
    startDate: string,
    endDate: string,
    minimumParticipants: number,
    maximumParticipants: number,
    autocancel: boolean,
    autojoin: boolean,
    joinDeadline: string,
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
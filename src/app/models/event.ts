export interface IUserEventResponse {
    result: IUserEvent
}

export interface IUserEvent {
    id: number,
    categoryId: number,
    hostId: number,
    title: string,
    startingDate: Date,
    endingDate: Date,
    minimumParticipants: number,
    maximumParticipants: number,
    autoCancel: boolean,
    autoJoin: boolean,
    joinDeadline: Date,
    fee: number,
    description: string,
    eventLocation: {
        id: number,
        street: string,
        address: string,
        city: string,
        province: string
    },
    contactEmail: string,
    contactPhone: string,
    tags: string,
    backgroundImage: string
}
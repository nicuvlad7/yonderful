export interface FiltersData {
    startDate:Date,
    endDate?:Date,
    categories?:number[],
    hiddenIfFee?:boolean,
    hiddenIfStarted?:boolean,
    hostId?:number,
    attendingId?:number,
    searchTitle?:string,
}
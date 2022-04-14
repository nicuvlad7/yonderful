export interface FiltersData {
    startDate:Date,
    endDate?:Date,
    categories?:number[],
    hiddenIfFee?:boolean,
    hiddenIfStarted?:boolean,
    HostId?:number,
    AttendingId?:number,
    searchTitle?:string,
}
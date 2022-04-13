export interface FiltersData {
    startDate:Date,
    endDate?:Date,
    categories?:number[],
    hiddenIfFee?:boolean,
    hiddenIfStarted?:boolean,
    isHostId?:number,
    isAttendingId?:number,
    searchTitle?:string,
}
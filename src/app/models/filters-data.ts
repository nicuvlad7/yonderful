export interface FiltersData {
    startDate:Date,
    endDate?:Date,
    categories?:number[],
    hiddenIfFee?:boolean,
    hiddenIfStarted?:boolean,
    isHost?:boolean,
    isAttending?:boolean,
    searchTitle?:string,
}
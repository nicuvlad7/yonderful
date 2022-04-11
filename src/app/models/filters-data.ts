export interface FiltersData {
    startDate:Date,
    endDate?:Date,
    categories?:string[],
    hiddenIfFee?:boolean,
    hiddenIfStarted?:boolean,
    isHost?:boolean,
    isAttending?:boolean,
    searchTitle?:string,
}
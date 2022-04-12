export interface IFilter {
    startingDate: Date,
    endingDate: Date,
    categoryID: number
}

export interface IFiltersResponse {
    result: IFilter[]
}
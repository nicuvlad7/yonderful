import { Injectable, Type } from '@angular/core';
import { Sort } from '../models/sort';
import { SortData } from '../models/sort-data';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  sort<Type>(sort: SortData, data: Array<any>): Type[] {
    const isAsc = sort.isAscending;
    return data.sort((a, b) => {
        return this.compare(a[sort.sortBy], b[sort.sortBy], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
	  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  
}

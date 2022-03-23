import { Injectable, Type } from '@angular/core';
import { Sort } from '../models/sort';

@Injectable({
  providedIn: 'root'
})
export class SortHelperService {

  constructor() { }

  sort<Type>(sort: Sort, data: Array<any>): Type[] {
    const isAsc = sort.direction === 'asc';
    return data.sort((a, b) => {
        return this.compare(a[sort.field], b[sort.field], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
	  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

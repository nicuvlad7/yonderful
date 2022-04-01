import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss']
})
export class GenericFilterComponent implements OnInit {

  constructor() { }
  isAscending:boolean=false;
  ngOnInit(): void {
  }

}

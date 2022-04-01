import { Component, OnInit } from '@angular/core';
import { RouteValues } from '../../models/constants';
@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
	redirect: string = '/' + RouteValues.DASHBOARD;
}

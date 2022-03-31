import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Role } from 'src/app/models/constants'
import { loginUser } from 'src/app/models/loginUser';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

	menuLabelsVisible = false;
	currentUser: loginUser;

	userRole: Role;
	roleType= Role;

	primaryMenuItemsUser: MenuItem[] = [
		{title:"Dashboard", name:"home" },
		{title:"All Events", name:"calendar_today" },
		{title:"Joined Events", name:"list_alt" },
		{title:"Hosted Events", name:"people" },
		{title:"My history", name:"history" }
	]

	secondaryMenuItems: MenuItem[] = [
		{title:"My Profile", name:"person_outline" },
		{title:"Info", name:"info" },
	]

	primaryMenuItemsAdmin: MenuItem[] = [
		{title:"Dashboard", name:"home" },
		{title:"Categories", name:"widgets" }
	]

	toggleSidebar(): void {
		this.menuLabelsVisible = !this.menuLabelsVisible;
	}

	constructor() {
	}

	ngOnInit(): void {
		this.userRole = JSON.parse(localStorage.getItem("currentUser")).role;
	}

}

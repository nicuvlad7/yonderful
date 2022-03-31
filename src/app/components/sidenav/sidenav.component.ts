import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Role, RouteValues } from 'src/app/models/constants'
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
        { title: "Dashboard", name: "home", route: RouteValues.DASHBOARD },
        { title: "All Events", name: "calendar_today", route: RouteValues.CREATE_EVENT },
        { title: "Joined Events", name: "list_alt", route: "" },
        { title: "Hosted Events", name: "people", route: "" },
        { title: "My history", name: "history", route: "" },

    ]

    secondaryMenuItems: MenuItem[] = [
        { title: "My Profile", name: "person_outline", route: "" },
        { title: "Info", name: "info", route: "" },
    ]

    primaryMenuItemsAdmin: MenuItem[] = [
        { title: "Dashboard", name: "home", route: RouteValues.DASHBOARD },
        { title: "Categories", name: "widgets", route: RouteValues.ADMINISTRATE_CATEGORIES }
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

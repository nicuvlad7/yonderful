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
    roleType = Role;

    primaryMenuItemsUser: MenuItem[] = [
        { title: "Dashboard", name: "home", route: RouteValues.DASHBOARD },
        { title: "All Events", name: "calendar_today", route: RouteValues.ALL_EVENTS },
        { title: "Joined Events", name: "list_alt", route: RouteValues.JOINED_EVENTS },
        { title: "Hosted Events", name: "people", route: RouteValues.HOSTED_EVENTS },
        { title: "My history", name: "history", route: "" },

    ]

    secondaryMenuItemsUser: MenuItem[] = [
        { title: "My Profile", name: "person_outline", route: RouteValues.USER_DETAILS },
        { title: "Info", name: "info", route: "" }
    ]

    primaryMenuItemsAdmin: MenuItem[] = [
        { title: "Dashboard", name: "home", route: RouteValues.DASHBOARD }
    ]

    secondaryMenuItemsAdmin: MenuItem[] = [
        { title: "Info", name: "info", route: "" }
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

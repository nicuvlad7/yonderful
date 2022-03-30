import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Role, SidenavItems } from 'src/app/models/constants'
import { loginUser } from 'src/app/models/loginUser';
import { Router } from '@angular/router';
import { RouteValues } from 'src/app/models/constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  sidenavItems = SidenavItems;
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

  constructor(private router: Router) {
    this.userRole = JSON.parse(localStorage.getItem("currentUser")).role;
  }

  ngOnInit(): void {
  }

  viewCategories(): void {
    this.router.navigate([RouteValues.ADMINISTRATE_CATEGORIES]);
  }

}

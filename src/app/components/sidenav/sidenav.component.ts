import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Role } from 'src/app/models/constants'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  menuLabelsVisible = false;
  
  roleType=Role;
  userRole=Role.Admin;

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

  changePerspective(): void{
    this.userRole = this.userRole === Role.Admin ? Role.User : Role.Admin;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

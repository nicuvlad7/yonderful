import { Component, Input, OnInit } from '@angular/core';
import { Icon } from 'src/app/models/icon';

enum Role{
  User=0,
  Admin=1
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  @Input() isDescription = false;
  
  eRole=Role;
  User=Role.Admin;

  primaryIconsUser: Icon[] = [
    {title:"Dashboard", name:"home" },
    {title:"All Events", name:"calendar_today" },
    {title:"Joined Events", name:"list_alt" },
    {title:"Hosted Events", name:"people" },
    {title:"My history", name:"history" }
  ]

  secondaryIcons: Icon[] = [
    {title:"My Profile", name:"person_outline" },
    {title:"Info", name:"info" },
  ]

  primaryIconsAdmin: Icon[] = [
    {title:"Dashboard", name:"home" },
    {title:"Categories", name:"widgets" }
  ]

  toggleSidebar(): void {
    this.isDescription = !this.isDescription;
  }

  changePerspective(): void{
    if(this.User==Role.Admin){
      this.User=Role.User;
    }
    else{
      this.User=Role.Admin;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}

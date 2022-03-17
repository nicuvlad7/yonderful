import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Role } from 'src/app/models/constants'
import { DialogService } from 'src/app/services/dialog.service';
import { Observable } from 'rxjs';

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
    this.yesNoDialog().subscribe(result => {
      if(result)
        this.userRole = this.userRole === Role.Admin ? Role.User : Role.Admin;
    })
    
  }

  constructor(private openChangeRoleDialog: DialogService) { }

  yesNoDialog():Observable<boolean>{
    return this.openChangeRoleDialog.confirmDialog({
      title: 'Confirm Action',
      message: 'Are u sure?',
      confirmText: 'Yes',
      cancelText: 'No'
    })
  }

  ngOnInit(): void {
  }

}

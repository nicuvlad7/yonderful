import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Workshop Angular';
  description = 'Angular Introduction';
  isMenuVisible = true;

  constructor(private router : Router) {
  }
  
  ngOnInit() {
    /*Waiting for login functionality to be implemented*/ 
    /*if(clientLoggedIn()){
      this.isMenuVisible = false;
    }
    else{
      this.isMenuVisible = true;
    }*/
  }

}


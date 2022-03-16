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
  showFiller = true;
  isMenuVisible = true;
  href='';

  constructor(private router : Router) {
  }
  
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href);
    /*TO DO
    research how does this.router.url looks like*/
    /*if(this.href=='/register'){
      this.isMenuVisible = false;
    }
    else if(this.href=='/login'){
      this.isMenuVisible = false;
    }
    else{
      this.isMenuVisible = true;
    }*/
  }

}


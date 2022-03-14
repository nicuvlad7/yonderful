import { Component, ViewEncapsulation } from '@angular/core';

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

  constructor() {
  }
  
  ngOnInit() {
  }

}

export class HideMenuIcon {
  showFiller = false;
}

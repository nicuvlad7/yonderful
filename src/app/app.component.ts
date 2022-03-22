import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  isMenuVisible = true;
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = '';
    this.router.events.subscribe((event) => {
      this.currentRoute = location.pathname;
      this.isMenuVisible = !(
        this.currentRoute === '/login' || this.currentRoute === '/register'
      );
    });
  }

  ngOnInit() {}
}

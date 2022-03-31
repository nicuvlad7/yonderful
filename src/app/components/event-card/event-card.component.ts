import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/models/event';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: IEvent;
  categoryIcon: SafeResourceUrl;
  countdownDays: number;
  
  constructor(private categoryService: CategoryService, private eventService: EventService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initalizeCategoryIcon();
    this.calculateRemainingDays();
  }

  initalizeCategoryIcon(): void {
    console.log(this.event.id);
    this.categoryService.getCategory(this.event.categoryId).subscribe((result) => {
      this.categoryIcon = this.sanitizer.bypassSecurityTrustResourceUrl(result.icon);
    })
  }

  calculateRemainingDays(): void {
    var currentDate = new Date();
    var newDate = new Date(this.event.startingDate); 
    var diff = Math.abs(currentDate.getTime() - newDate.getTime());
    this.countdownDays = Math.ceil(diff / (1000 * 3600 * 24)); 
  }

}

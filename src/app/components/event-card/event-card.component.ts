import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() eventId?;
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}

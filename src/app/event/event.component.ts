import { Component, OnInit } from '@angular/core';
import { TimelineEvent } from '../TimelineEvent';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event : TimelineEvent = {
    id: 1,
    shortDescription: "uga buga"
  }

  constructor() { }

  ngOnInit(): void {
  }

}

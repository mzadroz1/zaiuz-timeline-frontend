import { Component, OnInit } from '@angular/core';
import {EventTypeService} from "../../services/event-type.service";
import {EventType} from "../../models/event-type";

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

  eventTypeList: EventType[] = [];

  constructor(private eventTypeService: EventTypeService) { }

  ngOnInit(): void {
    this.getEventTypeList();
  }

  getEventTypeList() : void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
      })
  }

}

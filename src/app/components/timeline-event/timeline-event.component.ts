import {Component, OnInit} from '@angular/core';
import {TimelineEvent} from "../../models/timeline-event";
import {TimelineEventService} from "../../services/timeline-event.service";
import {EventType} from "../../models/event-type";
import {EventTypeService} from "../../services/event-type.service";

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.css']
})
export class TimelineEventComponent implements OnInit {

  timelineEventList: TimelineEvent[] = [];
  eventTypeList: EventType[] = [];

  constructor(private timelineEventService: TimelineEventService,
              private eventTypeService: EventTypeService) { }

  ngOnInit(): void {
    this.getTimelineEventList();
    this.getEventTypeList();
  }

  getTimelineEventList() : void {
    this.timelineEventService.getTimelineEventList()
      .subscribe({
        next: timelineEvents => {
          this.timelineEventList = timelineEvents;
        }
      })
  }

  getEventTypeList() : void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
      })
  }

  findEventTypeById(eventTypeId: number) : EventType | undefined {
    return this.eventTypeList.find((eventType) => eventType.id === eventTypeId);
  }

  isEventStartDateEqualToEventEndDate(timelineEvent: TimelineEvent) : boolean {
    return timelineEvent.event_start_date === timelineEvent.event_end_date;
  }
}

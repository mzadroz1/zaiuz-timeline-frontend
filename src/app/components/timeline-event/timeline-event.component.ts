import {Component, OnInit} from '@angular/core';
import {TimelineEvent} from "../../models/timeline-event";
import {TimelineEventService} from "../../services/timeline-event.service";
import {EventType} from "../../models/event-type";
import {EventTypeService} from "../../services/event-type.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {TimelineEventCreateComponent} from "../timeline-event-create/timeline-event-create.component";
import {TimelineEventEditComponent} from "../timeline-event-edit/timeline-event-edit.component";
import {TimelineEventDeleteComponent} from "../timeline-event-delete/timeline-event-delete.component";

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.css']
})
export class TimelineEventComponent implements OnInit {

  timelineEventList: TimelineEvent[] = [];
  eventTypeList: EventType[] = [];

  constructor(private timelineEventService: TimelineEventService,
              private eventTypeService: EventTypeService,
              public dialog: MatDialog) { }

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

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent);

  }

  openCreateEvent(): void {
    this.dialog.open(TimelineEventCreateComponent, {
      width: '500px'
    });
  }

  openEditDialog(item: TimelineEvent) {
    this.dialog.open(TimelineEventEditComponent, {
      data: {
        timelineEvent: item,
        eventTypeList: this.eventTypeList
      },
      width: '500px'
    })
  }

  openDeleteDialog(item: TimelineEvent) {
    let dialogRef = this.dialog.open(TimelineEventDeleteComponent, {
      data: item,
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result===true)
      if(result === true) {
        this.timelineEventService.deleteTimelineEvent(item.id).subscribe({
          next: this.ngOnInit
        })
      }
    })
  }
}

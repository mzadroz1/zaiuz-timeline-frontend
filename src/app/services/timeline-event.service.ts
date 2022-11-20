import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimelineEvent} from "../models/timeline-event";
import {TimelineEventResponse} from "../models/timeline-event-response";
import {TimelineEventRequest} from "../models/timeline-event-request";

@Injectable({
  providedIn: 'root'
})
export class TimelineEventService {

  private timelineEventListUrl = 'http://zaiuz-timeline.localhost/events'

  constructor(private httpClient: HttpClient) { }

  getTimelineEventList(): Observable<TimelineEvent[]> {
    return this.httpClient.get<TimelineEvent[]>(this.timelineEventListUrl);
  }

  getTimelineEventById(timelineEventId: number): Observable<TimelineEvent> {
    return this.httpClient.get<TimelineEvent>(this.timelineEventListUrl + '/' + timelineEventId);
  }

  createNewTimelineEvent(timelineEventRequest: TimelineEventRequest): Observable<TimelineEventResponse> {
    return this.httpClient.post<TimelineEventResponse>(this.timelineEventListUrl, timelineEventRequest);
  }

}

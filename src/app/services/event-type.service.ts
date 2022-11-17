import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventType} from "../models/event-type";

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  private eventTypeListUrl = 'https://zaiuz-timeline.herokuapp.com/public/index.php/event_types'

  constructor(private httpClient: HttpClient) { }

  getEventTypeList(): Observable<EventType[]> {
    return this.httpClient.get<EventType[]>(this.eventTypeListUrl);
  }
}

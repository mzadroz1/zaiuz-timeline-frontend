import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventTypesComponent} from "./components/event-types/event-types.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'eventTypes', component: EventTypesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

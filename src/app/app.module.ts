import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { FormsModule } from '@angular/forms';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';

@NgModule({
  declarations: [AppComponent, ManagerListComponent, VisitorFormComponent, MeetingDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

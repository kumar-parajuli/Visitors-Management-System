import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this line

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { FormsModule } from '@angular/forms';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { BookAppointmentsComponent } from './book-appointments/book-appointments.component';
import { ManagerService } from './services/manager.service'; // Adjust the path based on your actual folder structure
import { VisitorService } from './services/visitor.service';
import { MeetingDetailsService } from './services/meeting-details.service';
import { BookingAppointmentService } from './services/booking-appointment.service';
import { ManagerUpdateComponent } from './manager-update/manager-update.component';
import { UpdateVisitorComponent } from './update-visitor/update-visitor.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';
import { PrimeNGConfig } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
4;
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ManagerListComponent,
    VisitorFormComponent,
    MeetingDetailsComponent,
    BookAppointmentsComponent,
    ManagerUpdateComponent,
    UpdateVisitorComponent,
    UpdateMeetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Default timeOut duration (3 seconds)
      positionClass: 'toast-top-right', // Default position (top-right)
      preventDuplicates: true, // Prevent duplicate notifications
    }),
  ],
  providers: [
    ManagerService,
    VisitorService,
    MeetingDetailsService,
    BookingAppointmentService,
    PrimeNGConfig,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

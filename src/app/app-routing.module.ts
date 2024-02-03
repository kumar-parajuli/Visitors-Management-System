import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { BookAppointmentsComponent } from './book-appointments/book-appointments.component';
import { ManagerUpdateComponent } from './manager-update/manager-update.component';
import { UpdateVisitorComponent } from './update-visitor/update-visitor.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';

const routes: Routes = [
  { path: 'manager-list', component: ManagerListComponent },
  { path: 'visitor-form', component: VisitorFormComponent },
  { path: 'meeting-details', component: MeetingDetailsComponent },
  { path: 'book-appointments', component: BookAppointmentsComponent },
  { path: 'manager-update/:id', component: ManagerUpdateComponent },
  { path: 'update-visitor/:id', component: UpdateVisitorComponent }, // Add this route if using routing
  { path: 'update-meeting/:id', component: UpdateMeetingComponent }, // Route for updating meeting details
  { path: 'meeting-details-list', component: MeetingDetailsComponent },

  { path: '', redirectTo: '/visitor-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/visitor-form', pathMatch: 'full' },
  { path: '', redirectTo: '/meeting-details-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

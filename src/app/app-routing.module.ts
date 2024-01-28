import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { BookAppointmentsComponent } from './book-appointments/book-appointments.component';

const routes: Routes = [
  { path: 'manager-list', component: ManagerListComponent },
  { path: 'visitor-form', component: VisitorFormComponent },
  { path: 'meeting-details', component: MeetingDetailsComponent },
  { path: 'book-appointments', component: BookAppointmentsComponent },

  { path: '', redirectTo: '/visitor-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/visitor-form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

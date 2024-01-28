import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css'],
})
export class BookAppointmentsComponent {
  ManagerId: string = '';
  VisitorId: string = '';
  appointmentDate: string = '';
  Remarks: string = '';
   selectedTime: string = '';
  MeetingTitle: string = '';
  Attendees: string = '';
  @ViewChild('addBook') form: NgForm;
  onFormSubmitted() {
    console.log(this.selectedTime);
    console.log(this.form);
    this.ManagerId = this.form.value.managerId;
    this.VisitorId = this.form.value.visitorId;
    this.appointmentDate = this.form.value.appointmentDate;
    this.Remarks = this.form.value.remarks;
    this.selectedTime = this.form.value.time;
    this.MeetingTitle = this.form.value.meetingtitle;
    this.Attendees = this.form.value.attendees;
    this.form.reset();
  }
  editMeeting() {
    console.log('Edit meeting clicked');
  }

  deleteMeeting() {
    console.log('Delete meeting clicked');
  }
}

import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css'],
})
export class MeetingDetailsComponent {
  ManagerId: string = '';
  VisitorId: string = '';
  appointmentDate: string = '';
  Remarks: string = '';
  @ViewChild('addMeeting') form: NgForm;

  onFormSubmitted() {
    console.log(this.form);
    this.ManagerId = this.form.value.managerId;
    this.VisitorId = this.form.value.visitorId;
    this.appointmentDate = this.form.value.appointmentDate;
    this.Remarks = this.form.value.remarks;

    this.form.reset();
  }
  editMeeting() {
    console.log('Edit meeting clicked');
  }

  deleteMeeting() {
    console.log('Delete meeting clicked');
  }
}

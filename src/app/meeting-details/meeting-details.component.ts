import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MeetingDetailsService } from '../services/meeting-details.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MeetingDetails } from '../services/meeting-details.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css'],
})
export class MeetingDetailsComponent implements OnInit {
  managerId: string = '';
  visitorId: string = '';
  appointmentDate: string = '';
  bookingAppointment: string = '';
  Remarks: string = '';
  // meetingDetails: any[] = [];
  meetingDetails: any;
  @ViewChild('addMeeting') form: NgForm;
  bookings = [
    { id: 'check-yes', value: 'yes', display: 'Yes' },
    { id: 'check-no', value: 'no', display: 'No' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  booking: string = 'yes';
  constructor(
    private http: HttpClient,
    private router: Router,

    private meetingDetailsService: MeetingDetailsService
  ) {}

  ngOnInit(): void {
    this.fetchMeetingDetails();
  }

  fetchMeetingDetails() {
    this.meetingDetailsService.getAllMeetingDetails().subscribe((data: any) => {
      this.meetingDetails = data;
    });
  }

  addMeetingDetails() {
    const newMeetingDetails: MeetingDetails = {
      managerId: this.managerId,
      visitorId: this.visitorId,
      appointmentDate: this.appointmentDate,
      bookingAppointment: this.bookingAppointment,
      remarks: this.Remarks,
    };
    console.log(newMeetingDetails);
    this.meetingDetailsService.addMeetingDetails(newMeetingDetails).subscribe(
      (data) => {
        console.log('Meeting details added successfully:', data);
        this.resetForm();
        this.fetchMeetingDetails();
      },
      (error) => {
        console.error('Error adding meeting details:', error);
      }
    );
  }

  editMeetingDetails(meetingId: number) {
    this.router.navigate(['/update-meeting', meetingId]);
  }
  deleteMeetingDetails(id: number): void {
    // Implement delete meeting logic
    console.log('Delete button clicked for meeting details with ID:', id);
    this.meetingDetailsService.deleteMeetingDetails(id).subscribe(
      () => {
        this.fetchMeetingDetails();
      },
      (error) => {
        console.error('Error deleting meeting details: ', error);
      }
    );
  }

  resetForm(): void {
    this.managerId = '';
    this.visitorId = '';
    this.appointmentDate = '';
    this.bookingAppointment = '';
    this.Remarks = '';
    this.form.reset();
    this.form.form.patchValue({
      booking: 'yes',
    });
  }
}

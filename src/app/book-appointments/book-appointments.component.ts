import { MeetingDetailsService } from '../services/meeting-details.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css'],
})
export class BookAppointmentsComponent {
  ManagerId: string = '';
  VisitorId: string = '';
  ManagerFirstname: string = '';
  VisitorFirstname: string = '';
  appointmentDate: string = '';
  Remarks: string = '';
  bookingAppointment: string = '';
  minDate: string;
  meetingDetails: any[] = [];
  visitors: any[] = [];
  selectedAppointment: any;
  showManagerDetails: boolean = false;
  showVisitorDetails: boolean = false;
  @ViewChild('addBook') form: NgForm;
  bookingOptions = [
    { id: 'check-yes', value: 'yes', display: 'Yes' },
    { id: 'check-no', value: 'no', display: 'No' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  selectedBooking: string = 'yes';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private meetingDetailsService: MeetingDetailsService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.fetchMeetingDetails();
  }

  fetchMeetingDetails() {
    this.meetingDetailsService.getAllMeetingDetails().subscribe((data: any) => {
      this.meetingDetails = data;
    });
  }
  addBookAppointment() {
    const newBookAppointment = {
      managerId: this.ManagerId,
      visitorId: this.VisitorId,
      managerUsername: this.ManagerFirstname,
      visitorUsername: this.VisitorFirstname,
      appointmentDate: this.appointmentDate,
      bookingAppointment: this.bookingAppointment,
      remarks: this.Remarks,
    };

    this.meetingDetailsService.addMeetingDetails(newBookAppointment).subscribe(
      (data) => {
        console.log('Meeting details added successfully:', data);
        this.toastr.success('Meeting details added successfully!', 'Success');

        this.resetForm();
        this.fetchMeetingDetails();
      },
      (error) => {
        console.error('Error adding meeting details:', error);
        this.toastr.error('Failed to add meeting details!', 'Error');
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
  editAppointment(appointment: any) {
    // Set isEditing to true for the selected appointment
    appointment.isEditing = true;
  }

  updateAppointment(appointment: any) {
    // Implement the logic to update the appointment
    this.meetingDetailsService
      .updateMeetingDetails(appointment.id, appointment)
      .subscribe(
        () => {
          this.toastr.success(
            'Meeting details updated successfully!',
            'Success'
          );

          this.fetchMeetingDetails();
        },
        (error) => {
          console.error('Error updating appointment details:', error);
          console.error('Error updating appointment details:', error);
          this.toastr.error('Failed to update meeting details!', 'Error');
        }
      );

    // Reset isEditing to false after updating
    appointment.isEditing = false;
  }

  cancelEditing(appointment: any) {
    // Reset isEditing to false when canceling the edit
    appointment.isEditing = false;
  }
  resetForm(): void {
    (this.ManagerFirstname = ''),
      (this.VisitorFirstname = ''),
      (this.appointmentDate = '');
    this.Remarks = '';
    this.bookingAppointment;
    this.form.reset();
  }
  bookAppointment() {
    // Navigate to the booking-appointment-details route
    this.router.navigate(['/booking-appointment']);
  }
  viewMeetingDetails(appointment: any): void {
    this.selectedAppointment = appointment;
    this.showManagerDetails = true;
    this.showVisitorDetails = true;
  }
  cancelDetails(appointment: any): void {
    appointment.showDetails = false;
  }
  toggleDetails(appointment: any): void {
    appointment.showDetails = !appointment.showDetails;
  }
}

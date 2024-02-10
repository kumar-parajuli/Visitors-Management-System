import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MeetingDetailsService } from '../services/meeting-details.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MeetingDetails } from '../services/meeting-details.service';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css'],
})
export class MeetingDetailsComponent implements OnInit {
  // managerId: string = '';
  managerUsername: string = '';
  // managerFirstName: string = '';
  // visitorId: string = '';
  visitorUsername: string = '';
  // visitorFirstName: string = '';
  appointmentDate: string = '';
  bookingAppointment: string = '';
  Remarks: string = '';
  minDate: string;
  // meetingDetails: any[] = [];
  selectedManager: any;
  selectedVisitor: any;
  managerSuggestions: any[] = [];
  visitorSuggestions: any[] = [];

  meetingDetails: any;
  managers: any[] = [];
  visitors: any[] = [];
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
    private toastr: ToastrService,

    private meetingDetailsService: MeetingDetailsService,
    private primengConfig: PrimeNGConfig
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.fetchMeetingDetails();
    this.fetchManagers();
    this.fetchVisitors();
  }

  searchManagers(event: any) {
    this.meetingDetailsService.getAllManagers().subscribe((data: any) => {
      this.managerSuggestions = data;
    });
    console.log(this.managerSuggestions);
  }
  searchVisitors(event: any) {
    this.meetingDetailsService.getAllVisitors().subscribe((data: any) => {
      this.visitorSuggestions = data;
    });
  }
  fetchManagers() {
    this.meetingDetailsService.getAllManagers().subscribe((data: any) => {
      this.managers = data;
    });
  }

  fetchVisitors() {
    this.meetingDetailsService.getAllVisitors().subscribe((data: any) => {
      this.visitors = data;
    });
  }
  fetchMeetingDetails() {
    this.meetingDetailsService.getAllMeetingDetails().subscribe((data: any) => {
      this.meetingDetails = data;
    });
  }

  // addMeetingDetails() {
  //   console.log('Manager Username:', this.managerUsername);
  //   if (!this.managerUsername) {
  //     console.error('Manager username is empty or undefined.');
  //     return;
  //   }
  //   const selectedManager = this.managers.find(
  //     (manager) => manager.id === this.managerUsername
  //   );
  //   console.log(selectedManager);
  //   console.log(this.managerUsername);
  //   const selectedVisitor = this.visitors.find(
  //     (visitor) => visitor.id === this.visitorUsername
  //   );

  //   if (!selectedManager) {
  //     console.error(`Manager with username ${this.managerUsername} not found.`);
  //     return;
  //   }

  //   if (!selectedVisitor) {
  //     console.error(`Visitor with username ${this.visitorUsername} not found.`);
  //     return;
  //   }

  //   const newMeetingDetails: MeetingDetails = {
  //     managerId: selectedManager.id,
  //     managerUsername: selectedManager.firstName,
  //     visitorId: selectedVisitor.id,
  //     visitorUsername: selectedVisitor.firstName,
  //     appointmentDate: this.appointmentDate,
  //     bookingAppointment: this.bookingAppointment,
  //     remarks: this.Remarks,
  //   };

  //   console.log('New Meeting Details:', newMeetingDetails);

  //   this.meetingDetailsService.addMeetingDetails(newMeetingDetails).subscribe(
  //     (data) => {
  //       console.log('Meeting details added successfully:', data);
  //       this.resetForm();
  //       this.fetchMeetingDetails();
  //     },
  //     (error) => {
  //       console.error('Error adding meeting details:', error);
  //     }
  //   );
  // }
  addMeetingDetails() {
    console.log('Selected Manager:', this.selectedManager);
    console.log('Selected Visitor:', this.selectedVisitor);
    if (!this.selectedManager) {
      console.error('Manager is not selected.');
      this.toastr.error('Please select both manager and visitor.', 'Error');
      return;
    }

    if (!this.selectedVisitor) {
      console.error('Visitor is not selected.');
      this.toastr.error('Please select both manager and visitor.', 'Error');

      return;
    }

    const newMeetingDetails: MeetingDetails = {
      managerId: this.selectedManager.id,
      managerUsername: this.selectedManager.firstName,
      visitorId: this.selectedVisitor.id,
      visitorUsername: this.selectedVisitor.firstName,
      appointmentDate: this.appointmentDate,
      bookingAppointment: this.bookingAppointment,
      remarks: this.Remarks,
    };

    console.log('New Meeting Details:', newMeetingDetails);

    this.meetingDetailsService.addMeetingDetails(newMeetingDetails).subscribe(
      (data) => {
        this.toastr.success('Meeting details added successfully!', 'Success');
        this.resetForm();
        this.fetchMeetingDetails();
      },
      (error) => {
        console.error('Error adding meeting details:', error);
        this.toastr.error('Failed to add meeting details.', 'Error');
      }
    );
  }
  editMeetingDetails(meetingId: number) {
    this.router.navigate(['/update-meeting', meetingId]);
  }
  deleteMeetingDetails(id: number): void {
    console.log('Delete button clicked for meeting details with ID:', id);
    this.meetingDetailsService.deleteMeetingDetails(id).subscribe(
      () => {
        this.toastr.success('Meeting details deleted successfully!', 'Success');

        this.fetchMeetingDetails();
      },
      (error) => {
        console.error('Error deleting meeting details: ', error);
        this.toastr.error('Failed to delete meeting details.', 'Error');
      }
    );
  }

  resetForm(): void {
    // this.managerId = '';
    this.managerUsername = '';
    // this.visitorId = '';
    this.visitorUsername = '';
    this.appointmentDate = '';
    this.bookingAppointment = '';
    this.Remarks = '';
    this.form.reset();
    this.form.form.patchValue({
      booking: 'yes',
    });
  }
}

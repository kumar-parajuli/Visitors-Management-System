import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MeetingDetailsService } from '../services/meeting-details.service';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css'],
})
export class UpdateMeetingComponent {
  meetingId: number;
  meetingDetails: any;
  booking = [
    { id: 'check-yes', value: 'yes', display: 'Yes' },
    { id: 'check-no', value: 'no', display: 'No' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  defaultGender: string = 'yes';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingDetailsService: MeetingDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.meetingId = +params['id'];
      this.fetchMeetingDetails();
    });
  }

  fetchMeetingDetails() {
    this.meetingDetailsService.getMeetingDetailsById(this.meetingId).subscribe(
      (data: any) => {
        this.meetingDetails = data;
      },
      (error) => {
        console.error('Error fetching meeting details:', error);
      }
    );
  }
  editMeetingDetails(id: number): void {
    // Logic for handling the edit operation, for example, navigate to the update page
    this.router.navigate(['/update-meeting', id]);
  }
  updateMeetingDetails() {
    if (this.meetingDetails && this.meetingDetails.id !== undefined) {
      this.meetingDetailsService
        .updateMeetingDetails(this.meetingDetails.id, this.meetingDetails)
        .subscribe(
          () => {
            // Additional logic after updating meeting details if needed
            // For example, navigate back to the meeting details list
            this.router.navigate(['/meeting-details-list']);
          },
          (error) => {
            console.error('Error updating meeting details:', error);
          }
        );
    } else {
      console.error(
        'Meeting details or meetingDetails.id is undefined or not valid'
      );
    }
  }
  
  cancelEdit() {
    // You can navigate back to the meeting details list or any other page
    this.router.navigate(['/meeting-details-list']);
  }
}

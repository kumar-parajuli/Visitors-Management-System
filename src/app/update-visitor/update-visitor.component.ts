import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VisitorService } from '../services/visitor.service';
@Component({
  selector: 'app-update-visitor',
  templateUrl: './update-visitor.component.html',
  styleUrls: ['./update-visitor.component.css'],
})
export class UpdateVisitorComponent {
  visitorId: number;
  visitor: any;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private visitorService: VisitorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.visitorId = +params['id'];
      this.fetchVisitorDetails();
    });
  }

  fetchVisitorDetails() {
    this.visitorService.getVisitorById(this.visitorId).subscribe(
      (data: any) => {
        this.visitor = data;
      },
      (error) => {
        console.error('Error fetching manager details:', error);
      }
    );
  }

  updateVisitor() {
    if (this.visitor && this.visitor.id !== undefined) {
      this.visitorService
        .updateVisitor(this.visitor.id, this.visitor)
        .subscribe(
          (updateVisitorr: any) => {
            // Additional logic after updating a manager if needed
            // For example, navigate back to the manager list
            this.router.navigate(['/visitor-list']);
          },
          (error) => {
            console.error('Error updating visitor:', error);
          }
        );
    } else {
      console.error('Visitor or visitor.id is undefined or not valid');
    }
  }
  editVisitor(visitor: any): void {
    if (visitor && visitor.id !== undefined) {
      // Navigate to the update page with the visitor ID as a route parameter
      this.router.navigate(['/visitor-update', visitor.id]);
    } else {
      console.error('visitor or visitor.id is undefined or not valid');
      // Handle the undefined or not valid case, possibly show an error message
    }
  }
  cancelEdit() {
    // You can navigate back to the visitor list or any other page
    this.router.navigate(['/visitor-list']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VisitorService } from '../services/visitor.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.css'],
})
export class VisitorFormComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  email: string = '';
  address: string = '';
  phoneNumber: string = '';
  visitors: any[] = [];
  @ViewChild('addForm') form: NgForm;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  defaultGender: string = 'male';
  private apiUrl = 'http://localhost:8080/api/visitors';

  constructor(
    private http: HttpClient,
    private router: Router,

    private visitorService: VisitorService
  ) {}

  ngOnInit(): void {
    this.fetchVisitors();
  }

  fetchVisitors() {
    this.visitorService.getVisitors().subscribe((data: any) => {
      this.visitors = data;
    });
  }

  addVisitor() {
    const newVisitor = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
    };

    this.visitorService.addVisitor(newVisitor).subscribe(() => {
      this.fetchVisitors();
      this.resetForm();
    });
  }

  updateVisitor(visitor: any) {
    this.visitorService.updateVisitor(visitor.id, visitor).subscribe(() => {
      this.fetchVisitors();
      // Additional logic after updating a manager if needed
    });
  }

  editVisitor(visitor: any): void {
    if (visitor && visitor.id !== undefined) {
      // Navigate to the update page with the visitor ID as a route parameter
      this.router.navigate(['/update-visitor', visitor.id]);
    } else {
      console.error('Visitor or visitor.id is undefined or not valid');
      // Handle the undefined or not valid case, possibly show an error message
    }
  }

  deleteVisitorById(visitorId: any) {
    // Ensure visitorId is a number
    const idAsNumber: number = Number(visitorId);

    if (!isNaN(idAsNumber)) {
      this.visitorService.deleteVisitor(idAsNumber).subscribe(() => {
        this.fetchVisitors();
        this.resetForm();
      });
    } else {
      // Handle the case where visitorId is not a valid number
      console.error('Invalid visitorId:', visitorId);
    }
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.address = '';
    this.phoneNumber = '';
    this.gender = '';
    this.form.reset();
    // this.form.form.patchValue({
    //   gender: 'male',
    // });
  }

  getMaxDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}

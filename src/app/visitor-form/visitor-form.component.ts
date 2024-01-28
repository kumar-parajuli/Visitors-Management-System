import { Component, NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.css'],
})
export class VisitorFormComponent {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  remarks: string = '';
  address: string = '';
  phoneNumber: string = '';
  //create a properties
  @ViewChild('addVisitor') form: NgForm;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  defaultGender: string = 'male';
  onFormSubmitted() {
    console.log(this.form);

    this.firstName = this.form.value.firstname;
    this.lastName = this.form.value.lastname;
    this.address = this.form.value.address;
    this.phoneNumber = this.form.value.phonenumber;
    this.gender = this.form.value.gender;
    this.remarks = this.form.value.remarks;
    this.form.reset();
    this.form.form.patchValue({
      gender: 'male',
    });
  }
  editMeeting() {
    console.log('Edit meeting clicked');
  }

  deleteMeeting() {
    console.log('Delete meeting clicked');
  }
}

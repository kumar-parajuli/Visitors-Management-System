import { Component, NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
})
export class ManagerListComponent {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  dob: string = '';
  emailAddress: string = '';

  address: string = '';
  phoneNumber: string = '';
  //create a properties
  @ViewChild('addForm') form: NgForm;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  defaultGender: string = 'male';

  onFormSubmitted() {
    console.log(this.form);
    //another method to get data///
    // console.log(this.form.controls['firstname'].value);
    // console.log(this.form.value.lastname);
    // console.log(this.form.value.address);
    // console.log(this.form.value.phonenumber);
    // console.log(this.form.value.gender);
    this.firstName = this.form.value.firstname;
    this.lastName = this.form.value.lastname;
    this.address = this.form.value.address;
    this.phoneNumber = this.form.value.phonenumber;
    this.gender = this.form.value.gender;
    this.dob = this.form.value.dob;
    this.emailAddress = this.form.value.email;

    this.form.reset();
    this.form.form.patchValue({
      gender: 'male',
    });
  }
  getMaxDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  editMeeting() {
    console.log('Edit meeting clicked');
  }

  deleteMeeting() {
    console.log('Delete meeting clicked');
  }
}

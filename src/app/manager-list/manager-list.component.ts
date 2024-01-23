import { Component,NgModule } from '@angular/core';
import {  ViewChild } from '@angular/core';
import {NgForm } from '@angular/forms';
@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  address: string = '';

  //create a properties
  @ViewChild('addForm') form: NgForm;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  onFormSubmitted() {
    console.log(this.form);
    //another method to get data///
    console.log(this.form.controls['firstname'].value);
    console.log(this.form.value.lastname);
    console.log(this.form.value.address);
    console.log(this.form.value.phonenumber);
    console.log(this.form.value.gender);
  }
}


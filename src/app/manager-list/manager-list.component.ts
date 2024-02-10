import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagerService } from '../services/manager.service'; // Adjust the path based on your actual folder structure
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
})
export class ManagerListComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  email: string = '';
  address: string = '';
  phoneNumber: string = '';

  managers: any[] = []; // Declare the managers array
  manager: any; // Declare the manager property

  @ViewChild('addForm') form: NgForm;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];
  defaultGender: string = 'male';

  private apiUrl = 'http://localhost:8080/api/managers';

  constructor(
    private http: HttpClient,
    private router: Router,
    private managerService: ManagerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchManagers();
  }

  fetchManagers() {
    this.managerService.getManagers().subscribe((data: any) => {
      this.managers = data;
    });
  }

  addManager() {
    const newManager = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
    };

    this.managerService.addManager(newManager).subscribe(
      () => {
        this.toastr.success('Manager added successfully!', 'Success');
        this.fetchManagers();
        this.resetForm();
      },
      (error) => {
        this.toastr.error('Failed to add manager!', 'Error'); // Show error message
      }
    );
  }

  updateManager(manager: any) {
    this.managerService.updateManager(manager.id, manager).subscribe(
      () => {
        this.fetchManagers();
        this.toastr.success('Manager updated successfully!', 'Success'); // Show success message
      },
      (error) => {
        this.toastr.error('Failed to update manager!', 'Error'); // Show error message
      }
    );
  }

  editManager(manager: any): void {
    if (manager && manager.id !== undefined) {
      // Navigate to the update page with the manager ID as a route parameter
      this.router.navigate(['/manager-update', manager.id]);
    } else {
      console.error('Manager or manager.id is undefined or not valid');
      // Handle the undefined or not valid case, possibly show an error message
    }
  }
  deleteManagerById(managerId: number) {
    this.managerService.deleteManager(managerId.toString()).subscribe(
      () => {
        this.fetchManagers();
        this.resetForm();
        this.toastr.success('Manager deleted successfully!', 'Success'); // Show success message
      },
      (error) => {
        this.toastr.error('Failed to delete manager!', 'Error'); // Show error message
      }
    );
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.address = '';
    this.phoneNumber = '';
    this.gender = '';
    this.form.reset();
    this.form.form.patchValue({
      gender: 'male',
    });
  }

  getMaxDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}

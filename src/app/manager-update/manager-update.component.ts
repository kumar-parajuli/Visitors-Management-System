import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ManagerService } from '../services/manager.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-update',
  templateUrl: './manager-update.component.html',
  styleUrls: ['./manager-update.component.css'],
})
export class ManagerUpdateComponent implements OnInit {
  managerId: number;
  manager: any;
  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ];

  constructor(
    private http: HttpClient,
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.managerId = +params['id'];
      this.fetchManagerDetails();
    });
  }

  fetchManagerDetails() {
    this.managerService
      .getManagerById(this.managerId) // Use getManagerById instead of getManagers
      .subscribe(
        (data: any) => {
          this.manager = data;
        },
        (error) => {
          console.error('Error fetching manager details:', error);
        }
      );
  }
  updateManager() {
    if (this.manager && this.manager.id !== undefined) {
      this.managerService
        .updateManager(this.manager.id, this.manager)
        .subscribe(
          (updatedManager: any) => {
            // Additional logic after updating a manager if needed
            // For example, navigate back to the manager list
            this.router.navigate(['/manager-list']);
          },
          (error) => {
            console.error('Error updating manager:', error);
          }
        );
    } else {
      console.error('Manager or manager.id is undefined or not valid');
    }
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
  cancelEdit() {
    // You can navigate back to the manager list or any other page
    this.router.navigate(['/manager-list']);
  }
}

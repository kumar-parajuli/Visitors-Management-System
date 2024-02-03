// appointment.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: any[] = []; // Replace 'any[]' with your actual data type

  constructor() {}

  getAppointments(): Observable<any[]> {
    return of(this.appointments);
  }

  addAppointment(appointment: any): void {
    this.appointments.push(appointment);
  }
}

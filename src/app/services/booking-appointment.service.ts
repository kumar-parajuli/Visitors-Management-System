import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookingAppointment {
  managerId: string;
  visitorId: string;
  appointmentDate: string;
  remarks: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookingAppointmentService {
  private apiUrl = 'http://localhost:8080/api/meeting-details';

  constructor(private http: HttpClient) {}

  getAllBookingAppointment(): Observable<BookingAppointment[]> {
    return this.http.get<BookingAppointment[]>(this.apiUrl);
  }

  getBookingAppointmentById(id: number): Observable<BookingAppointment> {
    return this.http.get<BookingAppointment>(`${this.apiUrl}/${id}`);
  }

  addBookingAppointment(
    meetingDetails: BookingAppointment
  ): Observable<BookingAppointment> {
    return this.http.post<BookingAppointment>(this.apiUrl, meetingDetails);
  }

  updateBookingAppointment(
    id: number,
    bookingAppointment: BookingAppointment
  ): Observable<BookingAppointment> {
    return this.http.put<BookingAppointment>(
      `${this.apiUrl}/${id}`,
      bookingAppointment
    );
  }

  deleteMeetingDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

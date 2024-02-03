import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MeetingDetails {
  managerId: string;
  visitorId: string;
  appointmentDate: string;
  bookingAppointment: string;
  remarks: string;
  // Add other properties as needed
}
@Injectable({
  providedIn: 'root',
})
export class MeetingDetailsService {
  private apiUrl = 'http://localhost:8080/api/meeting-details';

  constructor(private http: HttpClient) {}

  getAllMeetingDetails(): Observable<MeetingDetails[]> {
    return this.http.get<MeetingDetails[]>(this.apiUrl);
  }

  getMeetingDetailsById(id: number): Observable<MeetingDetails> {
    return this.http.get<MeetingDetails>(`${this.apiUrl}/${id}`);
  }
  // addMeetingDetails(meetingDetails: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/add-meeting`, meetingDetails);
  // }
  addMeetingDetails(
    meetingDetails: MeetingDetails
  ): Observable<MeetingDetails> {
    return this.http.post<MeetingDetails>(this.apiUrl, meetingDetails);
  }
  // addMeetingDetails(
  //   meetingDetails: MeetingDetails
  // ): Observable<MeetingDetails> {
  //   return this.http.post<MeetingDetails>(this.apiUrl, meetingDetails).pipe(
  //     catchError((error) => {
  //       console.error('Error adding meeting details:', error);
  //       throw error; // Rethrow the error to propagate it to the subscriber
  //     })
  //   );
  // }

  updateMeetingDetails(
    id: number,
    meetingDetails: MeetingDetails
  ): Observable<MeetingDetails> {
    return this.http.put<MeetingDetails>(
      `${this.apiUrl}/${id}`,
      meetingDetails
    );
  }

  deleteMeetingDetails(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete-meeting/${id}`;
    return this.http.delete<void>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private apiUrl = 'http://localhost:8080/api/visitors';

  constructor(private http: HttpClient) {}

  getVisitors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getVisitorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addVisitor(visitor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-visitor`, visitor);
  }
  updateVisitor(id: number, updatedVisitor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-visitor/${id}`, updatedVisitor);
  }

  // updateVisitor(visitorId: string, visitorData: any): Observable<any> {
  //   const url = `${this.apiUrl}/update-visitor/${visitorId}`;

  //   console.log('Making HTTP request to:', url, 'with data:', visitorData);

  //   return this.http.put(url, visitorData).pipe(
  //     tap((response) => console.log('HTTP Response:', response)),
  //     catchError(this.handleError)
  //   );
  // }
  deleteVisitor(visitorId: number): Observable<any> {
    const url = `${this.apiUrl}/delete-visitor/${visitorId}`;
    return this.http.delete(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://localhost:8080/api/managers'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getManagers(): Observable<any[]> {
    const url = `${this.apiUrl}`;

    console.log('Making HTTP request to:', url);

    return this.http.get<any[]>(url).pipe(
      tap((response) => console.log('HTTP Response:', response)),
      catchError(this.handleError)
    );
  }
  getManagerById(managerId: number): Observable<any> {
    const url = `${this.apiUrl}/${managerId}`;
    return this.http.get<any>(url);
  }
  addManager(managerData: any): Observable<any> {
    const url = `${this.apiUrl}/add-manager`;

    console.log('Making HTTP request to:', url, 'with data:', managerData);

    return this.http.post(url, managerData).pipe(
      tap((response) => console.log('HTTP Response:', response)),
      catchError(this.handleError)
    );
  }
  updateManager(managerId: string, managerData: any): Observable<any> {
    const url = `${this.apiUrl}/update-manager/${managerId}`;

    console.log('Making HTTP request to:', url, 'with data:', managerData);

    return this.http.put(url, managerData).pipe(
      tap((response) => console.log('HTTP Response:', response)),
      catchError(this.handleError)
    );
  }
  

  deleteManager(managerId: string): Observable<void> {
    const url = `${this.apiUrl}/delete-manager/${managerId}`;

    console.log('Making HTTP request to:', url);

    return this.http.delete<void>(url).pipe(
      tap(() => console.log('HTTP Delete Response')),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

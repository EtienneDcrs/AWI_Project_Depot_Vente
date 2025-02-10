import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../models/Report';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = environment.backendHostUrl + '/report';

  constructor(private http: HttpClient) {}

  // Fetch the report from the API and return it as an Observable
  getReport(): Observable<Report> {
    return this.http.get<Report>(this.apiUrl);
  }

  // Fetch the session report from the API and return it as an Observable
  getSessionReport(): Observable<Report> {
    return this.http.get<Report>(this.apiUrl + '/session');
  }
}

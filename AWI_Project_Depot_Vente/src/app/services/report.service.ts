import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../models/Report';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private apiUrl = 'http://localhost:4000/api/report';

    constructor(private http: HttpClient) { }

    // Fetch the report from the API and return it as an Observable
    getReport(): Observable<Report> {
        return this.http.get<Report>(this.apiUrl);
    }

}
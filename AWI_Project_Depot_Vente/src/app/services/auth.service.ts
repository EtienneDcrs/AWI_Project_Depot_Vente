import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Function to check access to a specific section
  checkAccess(password: string, section: string): Observable<any> {
    const headers = new HttpHeaders({
      rolePassword: password // Attach password to headers
    });

    return this.http.get(`/api/${section}`, { headers });
  }
}

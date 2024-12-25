// src/app/services/session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Session {
    id: string;
    startDate: Date;
    endDate: Date;
    endDepositGame: Date;
    commissionType: string;
    commission: number;
    depositFeeType: string;
    depositFee: number;
}

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private apiUrl = 'http://localhost:4000/api/sessions';

    constructor(private http: HttpClient) { }

    getAllSessions(): Observable<Session[]> {
        return this.http.get<Session[]>(this.apiUrl);
    }

    getSessionById(id: string): Observable<Session> {
        return this.http.get<Session>(`${this.apiUrl}/${id}`);
    }

    addSession(session: Session): Observable<Session> {
        return this.http.post<Session>(this.apiUrl, session);
    }

    updateSession(id: string, session: Session): Observable<Session> {
        return this.http.put<Session>(`${this.apiUrl}/${id}`, session);
    }

    deleteSession(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getSessionId(): Observable<string> {
        return this.http.get<string>(`${this.apiUrl}/lastId`);
    }

    getDepositFee(id: string): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/depositFee/${id}`);
    }

    getCommission(id: string): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/commission/${id}`);
    }
}

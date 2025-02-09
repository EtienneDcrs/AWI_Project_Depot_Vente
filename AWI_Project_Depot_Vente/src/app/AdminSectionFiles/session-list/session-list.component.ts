import { Component } from '@angular/core';
import { Session, SessionService } from '../../services/session.service';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [AdminNavigationComponent],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.css'
})
export class SessionListComponent {

    sessions: Session[] = [];
    activeSessions: Session[] = [];
    closedSessions: Session[] = [];
    upcomingSessions: Session[] = [];
    date = new Date();

    constructor(private sessionService: SessionService) { }

    ngOnInit(): void {
        this.loadSessions();
    }

    loadSessions(): void {
        this.sessionService.getAllSessions().subscribe((sessions) => {
            this.sessions = sessions;
            for (let session of this.sessions) {
                const sessionStartDate = new Date(session.startDate);
                const sessionEndDate = new Date(session.endDate);

                if (sessionStartDate < this.date && sessionEndDate > this.date) {
                    this.activeSessions.push(session);
                } else if (sessionEndDate < this.date) {
                    this.closedSessions.push(session);
                } else {
                    this.upcomingSessions.push(session);
                }
            }
        });
    }
}

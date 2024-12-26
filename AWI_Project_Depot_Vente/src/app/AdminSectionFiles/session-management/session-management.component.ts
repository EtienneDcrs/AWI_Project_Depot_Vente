// src/app/session-management/session-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Session, SessionService } from '../../services/session.service';
import { DatePipe } from '@angular/common';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';

@Component({
    selector: 'app-session-management',
    standalone: true,
    imports: [ReactiveFormsModule, DatePipe, AdminNavigationComponent],
    templateUrl: './session-management.component.html',
    styleUrls: ['./session-management.component.css'],
})
export class SessionManagementComponent implements OnInit {
    sessionForm: FormGroup;
    sessions: Session[] = [];
    editMode = false;
    currentSessionId: string | null = null;

    constructor(private fb: FormBuilder, private sessionService: SessionService) {
        this.sessionForm = this.fb.group({
            id: ['', Validators.required],
            startSession: ['', Validators.required],
            endSession: ['', Validators.required],
            endDepositGame: ['', Validators.required],
            commissionType: ['', Validators.required],
            commission: [0, [Validators.required, Validators.min(0)]],
            depositFeeType: ['', Validators.required],
            depositFee: [0, [Validators.required, Validators.min(0)]],
        });
    }

    ngOnInit(): void {
        this.loadSessions();
    }

    loadSessions(): void {
        this.sessionService.getAllSessions().subscribe((sessions) => {
            this.sessions = sessions;
        });
    }

    onSubmit(): void {
        const session: Session = this.sessionForm.value;
        if (this.editMode && this.currentSessionId) {
            this.sessionService.updateSession(this.currentSessionId, session).subscribe(() => {
                this.loadSessions();
                this.resetForm();
            });
        } else {
            this.sessionService.addSession(session).subscribe(() => {
                this.loadSessions();
                this.resetForm();
            });
        }
    }

    editSession(session: Session): void {
        this.editMode = true;
        this.currentSessionId = session.id;
        this.sessionForm.patchValue(session);
    }

    deleteSession(id: string): void {
        this.sessionService.deleteSession(id).subscribe(() => {
            this.loadSessions();
        });
    }

    resetForm(): void {
        this.sessionForm.reset();
        this.editMode = false;
        this.currentSessionId = null;
    }
}

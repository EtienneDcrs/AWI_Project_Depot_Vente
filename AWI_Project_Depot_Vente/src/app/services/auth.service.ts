import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    // Observable to be subscribed to
    isLoggedIn$ = this.loggedIn.asObservable();

    // Call this method to log in
    login() {
        this.loggedIn.next(true);
    }

    // Call this method to log out
    logout() {
        this.loggedIn.next(false);
    }
}

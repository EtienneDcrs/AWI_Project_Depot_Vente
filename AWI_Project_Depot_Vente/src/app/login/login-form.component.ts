import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust the path accordingly

@Component({
    selector: 'login-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
            // Log in the user
            this.authService.login();
            // Navigate to the games page after successful login
            this.router.navigate(['/games']);
        }
    }
}

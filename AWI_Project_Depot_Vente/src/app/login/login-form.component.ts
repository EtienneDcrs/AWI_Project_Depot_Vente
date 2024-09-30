import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'login-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            // Handle login logic here
            console.log(this.loginForm.value);
        }
    }
}

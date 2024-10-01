import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { passwordMatchValidator } from '../../validators/password-validator';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Simuler une inscription réussie
      console.log(this.signupForm.value);

      // Informer le service d'authentification que l'utilisateur est connecté
      this.authService.login();

      // Rediriger vers la page des jeux
      this.router.navigate(['/games']);
    }
  }
}

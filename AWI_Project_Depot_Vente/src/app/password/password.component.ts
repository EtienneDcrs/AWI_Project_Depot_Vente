import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-prompt',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm: FormGroup;
  message: string = ''; // Message à afficher
  messageType: 'success' | 'error' | null = null; // Type de message

  @Output() transactionConfirmed = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.value.password;
      if (this.authService.verifyPassword(password)) {
        this.showMessage('Achat réussi', 'success');
        // Redirection après un délai
        setTimeout(() => {
          this.transactionConfirmed.emit();
        }, 3000);
      } else {
        this.showMessage('Erreur : Mot de passe incorrect', 'error');
      }
    }
  }

  private showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
    // Réinitialiser le message après 3 secondes
    setTimeout(() => {
      this.message = '';
      this.messageType = null; // Réinitialiser le type de message
    }, 3000);
  }
}

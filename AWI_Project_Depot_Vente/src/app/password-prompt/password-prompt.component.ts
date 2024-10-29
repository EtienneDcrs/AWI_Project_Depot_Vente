import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password-prompt.component.html',
  styleUrls: ['./password-prompt.component.css']
})
export class PasswordPromptComponent {
  @Output() passwordEntered = new EventEmitter<void>();

  password: string[] = ['', '', '', '', '', ''];
  correctPassword = '123456'; // Remplacez par le mot de passe correct
  errorMessage: string = '';
  passwordDigits: number[] = Array.from({ length: 6 }, (_, index) => index);
  isVibrating: boolean[] = [false, false, false, false, false, false]; // Pour gérer l'effet de vibration

  constructor() {
    // Lors de l'initialisation, placer le curseur dans le premier champ
    setTimeout(() => this.focusFirstInput(), 0);
  }

  onInput(index: number) {
    // Move to the next input if the current input is filled
    if (this.password[index] && index < this.password.length - 1) {
      const nextInput = document.querySelector(`input:nth-of-type(${index + 2})`) as HTMLElement;
      nextInput?.focus();
    }

    // Vérifier si tous les champs sont remplis
    if (this.password.every(p => p)) {
      this.submitPassword(); // Soumettre le mot de passe lorsque tous les champs sont remplis
    }
  }

  submitPassword() {
    const enteredPassword = this.password.join('');
    if (enteredPassword === this.correctPassword) {
      this.passwordEntered.emit(); // Émettez un événement pour accéder à la section Admin
      this.closeModal(); // Fermer la fenêtre modale
    } else {
      this.errorMessage = 'Incorrect password. Please try again.';
      this.triggerVibration(); // Appeler la méthode de vibration
    }
  }

  closeModal() {
    this.resetPassword();
  }

  private triggerVibration() {
    // Mettre à jour le tableau pour activer l'effet de vibration
    this.isVibrating.fill(true); // Activer la vibration pour tous les champs
    setTimeout(() => {
      this.isVibrating.fill(false); // Désactiver la vibration après 500ms
      this.resetPassword(); // Réinitialiser le mot de passe après une erreur
    }, 1000);
  }

  private resetPassword() {
    // Réinitialiser tous les champs
    this.password = ['', '', '', '', '', ''];
    this.errorMessage = '';
    this.focusFirstInput(); // Placer le focus sur le premier champ
  }

  private focusFirstInput() {
    // Placer le curseur dans le premier champ
    const firstInput = document.querySelector(`input:nth-of-type(1)`) as HTMLElement;
    firstInput?.focus();
  }
}

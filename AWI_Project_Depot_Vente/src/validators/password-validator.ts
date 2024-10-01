import { AbstractControl, ValidationErrors } from '@angular/forms';

// Fonction de validation personnalisée pour comparer les deux mots de passe
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true }; // Retourne une erreur si les mots de passe ne correspondent pas
    }
    return null; // Si tout va bien, retourne null (aucune erreur)
}

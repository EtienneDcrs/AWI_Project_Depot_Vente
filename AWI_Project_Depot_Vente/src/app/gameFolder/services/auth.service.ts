import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private password: string = '123456'; // Mot de passe fixe

  constructor() { }

  verifyPassword(inputPassword: string): boolean {
    return inputPassword === this.password;
  }
}

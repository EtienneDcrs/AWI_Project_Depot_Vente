import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PasswordPromptComponent } from "../password-prompt/password-prompt.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, PasswordPromptComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  showPasswordPrompt = false;

  openPasswordPrompt() {
    this.showPasswordPrompt = true;
  }

  handlePasswordEntered() {
    this.showPasswordPrompt = false;
    // Redirigez vers la section Admin ici
    this.goToAdminSection();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToGames() {
    this.router.navigate(['/games']);
  }

  goToAdminSection() {
    this.router.navigate(['/admin']);
  }

}

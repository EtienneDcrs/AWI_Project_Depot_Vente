import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToRegister() {
    this.router.navigate(['/enregistrement/enregistrerAchat']);
  }

  goToGames() {
    this.router.navigate(['/inventaire']);
  }

  goToAdminSection() {
    this.router.navigate(['/administration/transactions']);
  }
}

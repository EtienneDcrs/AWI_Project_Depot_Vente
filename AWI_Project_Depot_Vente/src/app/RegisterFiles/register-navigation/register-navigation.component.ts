import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-register-navigation',
  templateUrl: './register-navigation.component.html',
  imports: [RouterModule, MatIconModule],
  styleUrls: ['./register-navigation.component.css']
})
export class RegisterNavigationComponent {
  activeItem: string = '';

  menuItems = [
    { path: '/admin/enregistrerAchat', label: 'Enregistrer un achat' },
    { path: '/admin/deposerJeu', label: 'Déposer un jeu' },
    { path: '/admin/mettreRayon', label: 'Mettre en rayon' },
    { path: '/admin/retirerRayon', label: 'Enlever du rayon' },
    { path: '/admin/retirerStocks', label: 'Retirer des stocks' },
    { path: '/admin/ajouterVendeur', label: 'Ajouter un vendeur' },
    { path: '/admin/ajouterClient', label: 'Ajouter un client' }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.activeItem = this.router.url;
    });
  }

  isActive(path: string): boolean {
    return this.activeItem === path;
  }
}

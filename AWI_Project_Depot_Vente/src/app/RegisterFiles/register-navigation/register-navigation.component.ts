import { Component, ChangeDetectorRef } from '@angular/core';
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
    { path: '/register/enregistrerAchat', label: 'Enregistrer un achat' },
    { path: '/register/deposerJeu', label: 'Déposer un jeu' },
    { path: '/register/mettreRayon', label: 'Mettre en rayon' },
    { path: '/register/retirerRayon', label: 'Enlever du rayon' },
    { path: '/register/retirerStocks', label: 'Retirer des stocks' },
    { path: '/register/ajouterVendeur', label: 'Ajouter un vendeur' },
    { path: '/register/ajouterClient', label: 'Ajouter un client' }
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(() => {
      this.activeItem = this.router.url;
    });
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  isActive(path: string): boolean {
    return this.activeItem === path;
  }
}

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
    { path: '/enregistrement/enregistrerAchat', label: 'Enregistrer un achat' },
    { path: '/enregistrement/deposerJeu', label: 'Déposer un jeu' },
    { path: '/enregistrement/mettreRayon', label: 'Mettre en rayon' },
    { path: '/enregistrement/retirerRayon', label: 'Enlever du rayon' },
    { path: '/enregistrement/retirerStocks', label: 'Retirer des stocks' },
    { path: '/enregistrement/ajouterVendeur', label: 'Ajouter un vendeur' },
    { path: '/enregistrement/ajouterClient', label: 'Ajouter un client' }
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

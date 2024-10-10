import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    standalone: true,
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  imports: [RouterModule],
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {
  activeItem: string = '';

  menuItems = [
    { path: '/admin/transactions', label: 'Dashboard' },
    { path: '/admin/sellers', label: 'Users' },
    { path: '/admin/games', label: 'Settings' }
  ];

  constructor(private router: Router) {
    // Met à jour l'élément actif lors du changement de route
    this.router.events.subscribe(() => {
      this.activeItem = this.router.url;
    });
  }

  isActive(path: string): boolean {
    return this.activeItem === path;
  }
}
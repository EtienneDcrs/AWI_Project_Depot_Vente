import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  imports: [RouterModule, MatIconModule],
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {
  activeItem: string = '';

  menuItems = [
    { path: '/administration/transactions', label: 'Transactions', icon: 'credit_card' },
    { path: '/administration/seller-info', label: 'Infos vendeurs', icon: 'person' },
    { path: '/administration/seller-payments', label: 'Paiements dus', icon: 'payment' },
    { path: '/administration/general-report', label: 'Bilan général', icon: 'bar_chart' },
    { path: '/administration/session-management', label: 'Session management', icon: 'manage_accounts' }
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

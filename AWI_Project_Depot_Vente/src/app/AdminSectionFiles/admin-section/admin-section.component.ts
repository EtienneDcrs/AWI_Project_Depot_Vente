import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';

@Component({
  selector: 'app-admin-section',
  standalone: true,
  imports: [RouterOutlet, AdminNavigationComponent],
  templateUrl: './admin-section.component.html',
  styleUrl: './admin-section.component.css'
})
export class AdminSectionComponent {

  constructor() { }

  displayGames() {
  }

  displaySellers() {

  }

  displayBuyers() {
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';

@Component({
  selector: 'app-enregistrer-achat',
  standalone: true,
  imports: [RegisterNavigationComponent],
  templateUrl: './enregistrer-achat.component.html',
  styleUrl: './enregistrer-achat.component.css'
})
export class EnregistrerAchatComponent {

}

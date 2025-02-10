import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';

@Component({
  selector: 'app-register-section',
  standalone: true,
  imports: [RouterOutlet, RegisterNavigationComponent],
  templateUrl: './register-section.component.html',
  styleUrl: './register-section.component.css'
})
export class RegisterSectionComponent {

  constructor() { }

}

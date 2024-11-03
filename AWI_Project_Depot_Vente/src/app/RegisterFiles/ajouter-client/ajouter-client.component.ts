import { Component } from '@angular/core';
import { RegisterNavigationComponent } from "../register-navigation/register-navigation.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BuyerService } from '../../services/buyer.service';
import { Buyer } from '../../../models/Buyer';

@Component({
  selector: 'app-ajouter-client',
  standalone: true,
  imports: [RegisterNavigationComponent, ReactiveFormsModule],
  templateUrl: './ajouter-client.component.html',
  styleUrl: './ajouter-client.component.css'
})
export class AjouterClientComponent {

  clientForm: FormGroup;
  buyer!: Buyer;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private fb: FormBuilder, private buyerService: BuyerService) {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const { firstName, name, email, phone, address } = this.clientForm.value;

      // Créez un nouvel objet Seller explicitement avec les valeurs du formulaire
      this.buyer = new Buyer(firstName, name, email, phone, address);

      console.log('Form Submitted:', this.buyer);
      this.buyerService.addBuyer(this.buyer).subscribe(() => {
        console.log('client ajouté avec succès');

        // Afficher le message de succès
        this.showSuccessMessage = true;

        // Réinitialiser le formulaire
        this.clientForm.reset();

        // Cacher le message de succès après 3 secondes
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      });
    } else {
      this.showErrorMessage = true;

      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }

}

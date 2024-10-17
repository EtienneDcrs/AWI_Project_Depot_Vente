import { Component } from '@angular/core';
import { RegisterNavigationComponent } from "../register-navigation/register-navigation.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Seller } from '../../../models/Seller';

@Component({
  selector: 'app-ajouter-vendeur',
  standalone: true,
  imports: [RegisterNavigationComponent, ReactiveFormsModule],
  templateUrl: './ajouter-vendeur.component.html',
  styleUrl: './ajouter-vendeur.component.css'
})
export class AjouterVendeurComponent {

  vendeurForm: FormGroup;
  seller!: Seller;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private fb: FormBuilder, private sellerService: SellerService) {
    this.vendeurForm = this.fb.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    if (this.vendeurForm.valid) {
      const { firstName, name, email, phone } = this.vendeurForm.value;

      // Créez un nouvel objet Seller explicitement avec les valeurs du formulaire
      this.seller = new Seller(firstName, name, email, phone, []);

      console.log('Form Submitted:', this.seller);
      this.sellerService.addSeller(this.seller).subscribe(() => {
        console.log('Vendeur ajouté avec succès');

        // Afficher le message de succès
        this.showSuccessMessage = true;

        // Réinitialiser le formulaire
        this.vendeurForm.reset();

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

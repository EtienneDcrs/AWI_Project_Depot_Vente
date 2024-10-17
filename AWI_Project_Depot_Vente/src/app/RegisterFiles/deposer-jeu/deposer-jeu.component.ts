import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';

@Component({
  selector: 'app-deposer-jeu',
  standalone: true,
  imports: [ReactiveFormsModule, RegisterNavigationComponent],
  templateUrl: './deposer-jeu.component.html',
  styleUrls: ['./deposer-jeu.component.css']
})
export class DeposerJeuComponent {
  jeuForm: FormGroup;
  vendeurs: string[] = ['Vendeur 1', 'Vendeur 2', 'Vendeur 3']; // Remplacez par la liste des vendeurs récupérée
  filteredVendeurs: string[] = [];
  selectedVendeur: string | null = null;

  constructor(private fb: FormBuilder) {
    this.jeuForm = this.fb.group({
      nom: ['', Validators.required],
      editeur: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      vendeur: ['']
    });
  }

  onSearchVendeur(event: Event) {
    const input = event.target as HTMLInputElement; // Casting l'event.target
    const query = input.value;
    this.filteredVendeurs = this.vendeurs.filter(vendeur =>
      vendeur.toLowerCase().includes(query.toLowerCase())
    );
  }


  onVendeurSelect(vendeur: string) {
    this.selectedVendeur = vendeur;
    this.jeuForm.patchValue({ vendeur: vendeur });
    this.filteredVendeurs = [];
  }

  onSubmit() {
    if (this.jeuForm.valid) {
      console.log('Form Submitted:', this.jeuForm.value);
      // Envoyez les données du formulaire à votre API
    }
  }
}

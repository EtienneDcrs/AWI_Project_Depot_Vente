import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';
import { Game } from '../../../models/Game';
import { Seller } from '../../../models/Seller';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposer-jeu',
  templateUrl: './deposer-jeu.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RegisterNavigationComponent, CommonModule],
  styleUrls: ['./deposer-jeu.component.css']
})
export class DeposerJeuComponent {
  jeuForm: FormGroup;
  filteredVendeurs: any[] = [];
  selectedVendeur: any | null = null;
  message: string = ''; // Variable pour le message
  messageType: 'success' | 'error' | null = null; // Type de message

  constructor(private fb: FormBuilder, private stockService: StockService) {
    this.jeuForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      editor: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      sellerName: ['']
    });

    // Récupérer le dernier ID lors de l'initialisation du composant
    this.fetchLastGameId();
  }

  private fetchLastGameId() {
    this.stockService.getLastGameId().subscribe(
      (lastId) => {
        console.log('Last game ID:', lastId);
        this.jeuForm.patchValue({ id: lastId });
      },
      (error) => console.error('Error fetching last game ID:', error)
    );
  }

  onSearchVendeur(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (query.length > 2) {
      this.stockService.searchSellers(query).subscribe(
        (sellers) => (this.filteredVendeurs = sellers),
        (error) => console.error('Error fetching sellers:', error)
      );
    } else {
      this.filteredVendeurs = [];
    }
  }

  onVendeurSelect(vendeur: Seller) {
    this.selectedVendeur = vendeur;
    this.jeuForm.patchValue({ sellerName: `${vendeur.firstName} ${vendeur.name}` });
    this.filteredVendeurs = [];
  }

  onSubmit() {
    // Vérifier que le formulaire est valide et qu'un vendeur est sélectionné
    if (this.jeuForm.valid && this.selectedVendeur) {
      const currentId = this.jeuForm.value.id; // ID récupéré du formulaire

      const gameData: Game = new Game(
        this.jeuForm.value.name,
        this.jeuForm.value.editor,
        this.jeuForm.value.price,
        this.selectedVendeur.id,
        this.jeuForm.value.sellerName,
        'stock'
      );

      // Ajouter l'ID au nouvel objet Game
      gameData.id = currentId;

      console.log('Game data:', gameData); // Afficher les données du jeu dans la console

      // Appel au service pour ajouter le jeu en stock
      this.stockService.addGameToStock(gameData).subscribe(
        (response) => {
          console.log('Game added to stock:', response);
          this.displayMessage('Le jeu a été déposé avec succès!', 'success');
          this.jeuForm.reset(); // Réinitialiser le formulaire
          this.fetchLastGameId(); // Récupérer le nouvel ID
        },
        (error) => {
          console.error('Error adding game to stock:', error);
          this.displayMessage('Erreur lors du dépôt du jeu. Veuillez réessayer.', 'error');
        }
      );
    } else {
      console.warn('Form is invalid or no seller selected'); // Message de mise en garde si le formulaire est invalide
      this.displayMessage('Veuillez remplir tous les champs correctement.', 'error');
    }
  }

  private displayMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;

    // Effacer le message après 3 secondes
    setTimeout(() => {
      this.message = '';
      this.messageType = null;
    }, 3000);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { SessionService } from '../../services/session.service';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';
import { Game } from '../../../models/Game';
import { Seller } from '../../../models/Seller';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

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

    constructor(private fb: FormBuilder, private stockService: StockService, private router: Router, private sessionService: SessionService) {
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
                (sellers) => this.filteredVendeurs = this.filterVendeurs(sellers, query),
                (error) => console.error('Error fetching sellers:', error)
            );
        } else {
            this.filteredVendeurs = [];
        }
    }

    private filterVendeurs(sellers: Seller[], query: string): Seller[] {
        return sellers.filter(seller =>
            seller.firstName.toLowerCase().includes(query.toLowerCase()) ||
            seller.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    onVendeurSelect(vendeur: Seller) {
        this.selectedVendeur = vendeur;
        this.jeuForm.patchValue({ sellerName: `${vendeur.firstName} ${vendeur.name}` });
        this.filteredVendeurs = [];
    }

    onSubmit() {
        if (this.jeuForm.valid && this.selectedVendeur) {
            const currentId = this.jeuForm.value.id;
            const price = this.jeuForm.value.price;

            this.sessionService.getSessionId().subscribe({
                next: (sessionId) => {
                    if (!sessionId) {
                        throw new Error('Aucune session valide trouvée. Impossible de créer le jeu.');
                    }

                    console.log('Session ID:', sessionId);

                    // Récupérer les valeurs des frais et des types avec forkJoin
                    forkJoin({
                        depositFee: this.sessionService.getDepositFee(sessionId),
                        depositFeeType: this.sessionService.getDepositFeeType(sessionId),
                        commission: this.sessionService.getCommission(sessionId),
                        commissionType: this.sessionService.getCommissionType(sessionId),
                    }).subscribe({
                        next: ({ depositFee, depositFeeType, commission, commissionType }) => {

                            // Calcul des valeurs en fonction du type
                            const finalDepositFee = depositFeeType === 'relative' ? (price * depositFee) / 100 : depositFee;
                            const finalCommission = commissionType === 'relative' ? (price * commission) / 100 : commission;

                            // Création de l'objet Game une fois les données calculées
                            const gameData: Game = new Game(
                                this.jeuForm.value.name,
                                this.jeuForm.value.editor,
                                price,
                                this.selectedVendeur.id,
                                this.jeuForm.value.sellerName,
                                'stock',
                                sessionId,
                                finalDepositFee,
                                finalCommission
                            );
                            gameData.id = currentId;

                            console.log('Game data:', gameData);

                            // Ajout du jeu au stock
                            this.stockService.addGameToStock(gameData).subscribe(
                                (response) => {
                                    console.log('Game added to stock:', response);
                                    this.displayMessage('Le jeu a été déposé avec succès!', 'success');
                                    this.jeuForm.reset();
                                    this.fetchLastGameId();
                                },
                                (error) => {
                                    console.error('Error adding game to stock:', error);
                                    this.displayMessage('Erreur lors du dépôt du jeu. Veuillez réessayer.', 'error');
                                }
                            );
                        },
                        error: (err) => {
                            console.error('Erreur lors de la récupération des frais et commissions:', err);
                        },
                    });
                },
                error: (err) => {
                    console.error('Erreur lors de la récupération de la session:', err);
                },
            });
        } else {
            console.warn('Form is invalid or no seller selected');
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

    navigateToAddSeller() {
        this.router.navigate(['/enregistrement/ajouterVendeur']);
    }
}

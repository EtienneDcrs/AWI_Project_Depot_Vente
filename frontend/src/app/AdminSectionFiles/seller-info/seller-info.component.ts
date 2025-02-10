import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { SellerService } from '../../services/seller.service';
import { Seller } from '../../../models/Seller';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';
import { Game } from '../../../models/Game';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GameCardComponent } from '../../gameFolder/game-card/game-card.component';
import { Transaction } from '../../../models/Transaction';

@Component({
    selector: 'app-seller-info',
    standalone: true,
    imports: [CommonModule, AdminNavigationComponent, GameCardComponent], // Ajouter CommonModule aux imports
    templateUrl: './seller-info.component.html',
    styleUrl: './seller-info.component.css'
})

export class SellerInfoComponent {
    seller: Seller | undefined;
    sellerStock: Game[] = [];
    visibleGames: Game[] = [];
    private currentIndex = 0;
    private itemsPerSlide = 4;
    showLeftButton: boolean = false;
    showRightButton: boolean = true;
    sellerTransactions: Transaction[] = [];
    sellerSales: Game[] = [];
    visibleSales: Game[] = [];
    private currentSalesIndex = 0;
    showLeftSalesButton: boolean = false;
    showRightSalesButton: boolean = true;

    constructor(private sellerService: SellerService, private gameService: GameService, private route: ActivatedRoute) {

    }

    //recupère l'id du vendeur dans l'url
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadSeller(id);
        } else {
            console.error('ID du vendeur non trouvé dans l\'URL');
        }

        this.updateVisibleGames();
        this.updateVisibleSales();
    }

    //charge les informations du vendeur
    loadSeller(id: string) {
        this.sellerService.getSeller(id).subscribe(
            (data) => {
                this.seller = data;
                console.log(this.seller);

                

                if (this.seller?.stocks.length > 0) {
                    this.sellerService.getSellerStock(id).subscribe(
                        (data) => {
                            this.sellerStock = data;
                            this.updateVisibleGames(); // Mise à jour des jeux visibles après avoir récupéré les stocks
                        },
                        (error) => {
                            console.error('Erreur lors de la récupération des stocks du vendeur:', error);
                        }
                    );
                } else {
                    this.sellerStock = [];
                    this.updateVisibleGames(); // Mise à jour des jeux visibles même si le stock est vide
                }

                if (this.seller?.sales.length > 0) {
                    this.sellerService.getSellerSales(id).subscribe(
                        (data) => {
                            this.sellerSales = data;
                            this.updateVisibleSales(); // Mise à jour des jeux visibles après avoir récupéré les ventes
                        },
                        (error) => {
                            console.error('Erreur lors de la récupération des ventes du vendeur:', error);
                        }
                    );
                    this.sellerService.getSellerTransactions(id).subscribe(
                        (data) => {
                            this.sellerTransactions = data;
                            console.log('Transactions du vendeur:', this.sellerTransactions);
                        },
                        (error) => {
                            console.error('Erreur lors de la récupération des transactions du vendeur:', error);
                        }
                    );
                } else {
                    this.sellerSales = [];
                    this.updateVisibleSales(); // Mise à jour des jeux visibles même si les ventes sont vides
                }
            },
            (error) => {
                console.error('Erreur lors de la récupération des informations du vendeur:', error);
            }
        );
    }



    updateVisibleGames() {
        this.visibleGames = this.sellerStock.slice(this.currentIndex, this.currentIndex + this.itemsPerSlide);
        this.showLeftButton = this.currentIndex > 0;
        this.showRightButton = this.currentIndex + this.itemsPerSlide < this.sellerStock.length;
    }

    updateVisibleSales() {
        this.visibleSales = this.sellerSales.slice(this.currentSalesIndex, this.currentSalesIndex + this.itemsPerSlide);
        this.showLeftSalesButton = this.currentSalesIndex > 0;
        this.showRightSalesButton = this.currentSalesIndex + this.itemsPerSlide < this.sellerSales.length;
    }

    scrollRight() {
        if (this.currentIndex + this.itemsPerSlide < this.sellerStock.length) {
            this.currentIndex += this.itemsPerSlide;
            this.updateVisibleGames();
        }

    }

    scrollLeft() {
        if (this.currentIndex - this.itemsPerSlide >= 0) {
            this.currentIndex -= this.itemsPerSlide;
            this.updateVisibleGames();
        }
    }

    scrollRightSales() {
        if (this.currentSalesIndex + this.itemsPerSlide < this.sellerSales.length) {
            this.currentSalesIndex += this.itemsPerSlide;
            this.updateVisibleSales();
        }
    }

    scrollLeftSales() {
        if (this.currentSalesIndex - this.itemsPerSlide >= 0) {
            this.currentSalesIndex -= this.itemsPerSlide;
            this.updateVisibleSales();
        }
    }
}
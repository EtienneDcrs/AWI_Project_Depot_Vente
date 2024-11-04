import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Seller } from '../../../models/Seller';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';
import { Game } from '../../../models/Game';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-seller-info',
    standalone: true,
    imports: [AdminNavigationComponent],
    templateUrl: './seller-info.component.html',
    styleUrl: './seller-info.component.css'
})

export class SellerInfoComponent {
    seller: Seller | undefined;
    sellerStock: Game[] = [];
    constructor(private sellerService: SellerService, private route: ActivatedRoute ) { 
        
    }

    //recupère l'id du vendeur dans l'url
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadSeller(id);
            
        } else {
            console.error('ID du vendeur non trouvé dans l\'URL');
        }

    }

    //charge les informations du vendeur
    loadSeller(id: string) {
        this.sellerService.getSeller(id).subscribe(
            (data) => {
                console.log(data);
                this.seller = data;
                this.sellerStock = this.seller.getStock();
            },
            (error) => {
                console.error('Erreur lors de la récupération des informations du vendeur:', error);
            }
        );
    }
}

import { Component, OnInit } from '@angular/core';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';
import { SellerService } from '../../services/seller.service';
import { MatDialog } from '@angular/material/dialog';
import { Seller } from '../../../models/Seller';
import { Router } from '@angular/router';

@Component({
    selector: 'app-seller-list',
    standalone: true,
    imports: [AdminNavigationComponent],
    templateUrl: './seller-list.component.html',
    styleUrl: './seller-list.component.css'
})
export class SellerListComponent implements OnInit {
    filteredSellers: Seller[] = [];
    sellers: Seller[] = [];


    constructor(private router: Router, private sellerService: SellerService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadSellers();
    }

    loadSellers() {
        this.sellerService.getSellers().subscribe(
            (data: Seller[]) => {
                this.sellers = data;
                this.filteredSellers = data;
            },
            (error) => {
                console.error('Erreur lors de la récupération des vendeurs en stock:', error);
            }
        );
    }

    goToSeller(seller: Seller) {
        console.log(seller);
        this.router.navigate(['/administration/seller-info/', seller.id]);
    }
}

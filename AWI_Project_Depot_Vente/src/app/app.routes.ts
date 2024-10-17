import { Routes } from '@angular/router';
import { GamePageComponent } from './gameFolder/game-page/game-page.component';
import { CheckoutComponent } from './gameFolder/checkout/checkout.component';
import { TransactionComponent } from './AdminSectionFiles/transaction/transaction.component';
import { AdminSectionComponent } from './AdminSectionFiles/admin-section/admin-section.component';
import { SellerInfoComponent } from './AdminSectionFiles/seller-info/seller-info.component';
import { SellerPaymentsComponent } from './AdminSectionFiles/seller-payments/seller-payments.component';
import { GameSoldComponent } from './AdminSectionFiles/game-sold/game-sold.component';
import { GeneralReportComponent } from './AdminSectionFiles/general-report/general-report.component';
import { RegisterSectionComponent } from './RegisterFiles/register-section/register-section.component';
import { EnregistrerAchatComponent } from './RegisterFiles/enregistrer-achat/enregistrer-achat.component';
import { RetirerStocksComponent } from './RegisterFiles/retirer-stocks/retirer-stocks.component';
import { AjouterClientComponent } from './RegisterFiles/ajouter-client/ajouter-client.component';
import { AjouterVendeurComponent } from './RegisterFiles/ajouter-vendeur/ajouter-vendeur.component';
import { RetirerRayonComponent } from './RegisterFiles/retirer-rayon/retirer-rayon.component';
import { MettreRayonComponent } from './RegisterFiles/mettre-rayon/mettre-rayon.component';
import { DeposerJeuComponent } from './RegisterFiles/deposer-jeu/deposer-jeu.component';


export const routes: Routes = [

    { path: 'register', component: RegisterSectionComponent },
    { path: 'games', component: GamePageComponent },
    { path: 'admin', component: AdminSectionComponent },

    { path: 'admin/transactions', component: TransactionComponent },
    { path: 'admin/seller-info', component: SellerInfoComponent },
    { path: 'admin/seller-payments', component: SellerPaymentsComponent },
    { path: 'admin/game-sold', component: GameSoldComponent },
    { path: 'admin/general-report', component: GeneralReportComponent },

    { path: 'register/enregistrerAchat', component: EnregistrerAchatComponent },
    { path: 'register/deposerJeu', component: DeposerJeuComponent },
    { path: 'register/mettreRayon', component: MettreRayonComponent },
    { path: 'register/retirerRayon', component: RetirerRayonComponent },
    { path: 'register/retirerStocks', component: RetirerStocksComponent },
    { path: 'register/ajouterVendeur', component: AjouterVendeurComponent },
    { path: 'register/ajouterClient', component: AjouterClientComponent },

    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { GamePageComponent } from './gameFolder/game-page/game-page.component';
import { CheckoutComponent } from './Composant/checkout/checkout.component';
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

    { path: 'enregistrement', component: RegisterSectionComponent },
    { path: 'inventaire', component: GamePageComponent },
    { path: 'administration', component: AdminSectionComponent },

    { path: 'administration/transactions', component: TransactionComponent },
    { path: 'administration/seller-info', component: SellerInfoComponent },
    { path: 'administration/seller-payments', component: SellerPaymentsComponent },
    { path: 'administration/game-sold', component: GameSoldComponent },
    { path: 'administration/general-report', component: GeneralReportComponent },

    { path: 'enregistrement/enregistrerAchat', component: EnregistrerAchatComponent },
    { path: 'enregistrement/deposerJeu', component: DeposerJeuComponent },
    { path: 'enregistrement/mettreRayon', component: MettreRayonComponent },
    { path: 'enregistrement/retirerRayon', component: RetirerRayonComponent },
    { path: 'enregistrement/retirerStocks', component: RetirerStocksComponent },
    { path: 'enregistrement/ajouterVendeur', component: AjouterVendeurComponent },
    { path: 'enregistrement/ajouterClient', component: AjouterClientComponent },

    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: 'inventaire', pathMatch: 'full' }
];

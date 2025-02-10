import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from './gameFolder/game-page/game-page.component';
import { CheckoutComponent } from './RegisterFiles/checkout/checkout.component';
import { TransactionComponent } from './AdminSectionFiles/transaction/transaction.component';
import { AdminSectionComponent } from './AdminSectionFiles/admin-section/admin-section.component';
import { SellerListComponent } from './AdminSectionFiles/seller-list/seller-list.component';
import { SellerInfoComponent } from './AdminSectionFiles/seller-info/seller-info.component';
import { SellerPaymentsComponent } from './AdminSectionFiles/seller-payments/seller-payments.component';
import { GeneralReportComponent } from './AdminSectionFiles/general-report/general-report.component';
import { SessionManagementComponent } from './AdminSectionFiles/session-management/session-management.component';
import { RegisterSectionComponent } from './RegisterFiles/register-section/register-section.component';
import { EnregistrerAchatComponent } from './RegisterFiles/enregistrer-achat/enregistrer-achat.component';
import { RetirerStocksComponent } from './RegisterFiles/retirer-stocks/retirer-stocks.component';
import { AjouterClientComponent } from './RegisterFiles/ajouter-client/ajouter-client.component';
import { AjouterVendeurComponent } from './RegisterFiles/ajouter-vendeur/ajouter-vendeur.component';
import { RetirerRayonComponent } from './RegisterFiles/retirer-rayon/retirer-rayon.component';
import { MettreRayonComponent } from './RegisterFiles/mettre-rayon/mettre-rayon.component';
import { DeposerJeuComponent } from './RegisterFiles/deposer-jeu/deposer-jeu.component';
import { SessionListComponent } from './AdminSectionFiles/session-list/session-list.component';
import { LoginComponent } from './Composant/login/login.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { NgModule } from '@angular/core';


export const routes: Routes = [

    { path: 'inventaire', component: GamePageComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'inventaire', pathMatch: 'full' },

    {
        path: 'enregistrement',
        component: RegisterSectionComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin', 'gerant'] },
        children: [
            { path: 'enregistrerAchat', component: EnregistrerAchatComponent },
            { path: 'deposerJeu', component: DeposerJeuComponent },
            { path: 'mettreRayon', component: MettreRayonComponent },
            { path: 'retirerRayon', component: RetirerRayonComponent },
            { path: 'retirerStocks', component: RetirerStocksComponent },
            { path: 'ajouterVendeur', component: AjouterVendeurComponent },
            { path: 'ajouterClient', component: AjouterClientComponent },
            { path: 'checkout', component: CheckoutComponent },
        ]
    },
    {
        path: 'administration',
        component: AdminSectionComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] },
        children: [
            { path: 'transactions', component: TransactionComponent },
            { path: 'seller-info', component: SellerListComponent },
            { path: 'seller-info/:id', component: SellerInfoComponent },
            { path: 'seller-payments', component: SellerPaymentsComponent },
            { path: 'general-report', component: GeneralReportComponent },
            { path: 'session-list', component: SessionListComponent },
            { path: 'session-management', component: SessionManagementComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
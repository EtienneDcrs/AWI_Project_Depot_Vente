import { Routes } from '@angular/router';
import { GamePageComponent } from './gameFolder/game-page/game-page.component';
import { CheckoutComponent } from './gameFolder/checkout/checkout.component';
import { TransactionComponent } from './AdminSectionFiles/transaction/transaction.component';
import { AdminSectionComponent } from './AdminSectionFiles/admin-section/admin-section.component';
import { SellerInfoComponent } from './AdminSectionFiles/seller-info/seller-info.component';
import { SellerPaymentsComponent } from './AdminSectionFiles/seller-payments/seller-payments.component';
import { GameSoldComponent } from './AdminSectionFiles/game-sold/game-sold.component';
import { GeneralReportComponent } from './AdminSectionFiles/general-report/general-report.component';

export const routes: Routes = [

    { path: 'games', component: GamePageComponent },
    { path: 'admin', component: AdminSectionComponent },
    { path: 'admin/transactions', component: TransactionComponent },
    { path: 'admin/seller-info', component: SellerInfoComponent },
    { path: 'admin/seller-payments', component: SellerPaymentsComponent },
    { path: 'admin/game-sold', component: GameSoldComponent },
    { path: 'admin/general-report', component: GeneralReportComponent },

    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
];

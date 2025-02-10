import { Component } from '@angular/core';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../../models/Transaction';
import { ReportService } from '../../services/report.service';
import { Report } from '../../../models/Report';

@Component({
    selector: 'app-general-report',
    standalone: true,
    imports: [AdminNavigationComponent],
    templateUrl: './general-report.component.html',
    styleUrl: './general-report.component.css',
})
export class GeneralReportComponent {
    report!: Report;
    sessionReport!: Report;

    constructor(
        private reportService: ReportService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.loadReport();
        console.log('General Report Component');
    }

    loadReport() {
        this.reportService.getReport().subscribe((data) => {
            this.report = data;
            console.log(this.report);
        });
        this.reportService.getSessionReport().subscribe((data) => {
            this.sessionReport = data;
            console.log(this.sessionReport);
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {Monitoring} from "../../models/monitoring";
import {MonitoringService} from "../../services/monitoring.service";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

    monitoring: Monitoring = null;
    updating1 = false;
    updating2 = false;

    constructor(private monitoringService: MonitoringService, private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            "refresh",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/refresh.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "bike",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/bike.svg")
        );
    }

    async ngOnInit() {
        this.monitoring = new Monitoring(await this.monitoringService.getNumberOfRequest(), await this.monitoringService.getMeanTime());
    }

    refreshRequestNumber() {
        if (!this.updating1) {
            this.updating1 = true;
            this.monitoringService.getNumberOfRequest().then(res => {
                this.monitoring.number_requests = res;
                this.updating1 = false;
            });
        }
    }

    refreshMeanTime() {
        if (!this.updating2) {
            this.updating2 = true;
            this.monitoringService.getMeanTime().then(res => {
                this.monitoring.mean_request_time = res;
                this.updating2 = false;
            });
        }
    }
}

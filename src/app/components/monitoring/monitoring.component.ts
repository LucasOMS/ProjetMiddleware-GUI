import {Component, OnInit} from '@angular/core';
import {Monitoring} from "../../models/monitoring";
import {MonitoringService} from "../../services/monitoring.service";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

    monitoring: Monitoring = null;
    updating1 = false;
    updating2 = false;
    loggedUser: User = null;

    constructor(private userService: UserService, private monitoringService: MonitoringService,
                private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
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
        this.loggedUser = await this.userService.getLoggedUser();
        if (this.loggedUser !== null) {
            this.monitoring = new Monitoring(await this.monitoringService.getNumberOfRequest(this.loggedUser),
                await this.monitoringService.getMeanTime(this.loggedUser));
        } else {
            this.monitoring = new Monitoring(-1, -1);
        }
    }

    refreshRequestNumber() {
        if (!this.updating1 && this.loggedUser !== null) {
            this.updating1 = true;
            this.monitoringService.getNumberOfRequest(this.loggedUser).then(res => {
                this.monitoring.number_requests = res;
                this.updating1 = false;
            });
        }
    }

    refreshMeanTime() {
        if (!this.updating2 && this.loggedUser !== null) {
            this.updating2 = true;
            this.monitoringService.getMeanTime(this.loggedUser).then(res => {
                this.monitoring.mean_request_time = res;
                this.updating2 = false;
            });
        }
    }
}

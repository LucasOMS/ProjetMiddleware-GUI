import {Component, Input, OnInit} from '@angular/core';
import {Station, StationStatus} from "../../models/station";
import {VelibService} from "../../services/velib.service";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-station-view',
    templateUrl: './station-view.component.html',
    styleUrls: ['./station-view.component.scss']
})
export class StationViewComponent implements OnInit {

    @Input()
    station: Station;
    updating: boolean;

    constructor(private velibService: VelibService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            "refresh",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/refresh.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "bike",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/bike.svg")
        );
        this.updating = false;
    }

    ngOnInit() {
    }

    refreshData() {
        if (!this.updating) {
            this.updating = true;
            this.velibService.retrieveDataFor(this.station).then(res => {
                this.station = res;
                this.updating = false;
            });
        }
    }

    status(status: StationStatus) {
        switch (status) {
            case StationStatus.CLOSED:
                return "Fermée";
            case StationStatus.OPEN:
                return "Ouverte";
            case StationStatus.UNKNOWN:
                return "Aucune information d'ouverture";
        }
    }
}

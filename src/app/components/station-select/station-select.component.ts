import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Station} from "../../models/station";

@Component({
    selector: 'app-station-select',
    templateUrl: './station-select.component.html',
    styleUrls: ['./station-select.component.scss']
})
export class StationSelectComponent implements OnInit {

    @Input()
    stations: Station[];

    @Output()
    selected: EventEmitter<Station> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    select(station: Station) {
        this.selected.emit(station);
    }

}

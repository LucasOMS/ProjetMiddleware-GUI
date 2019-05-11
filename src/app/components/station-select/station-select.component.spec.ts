import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StationSelectComponent} from './station-select.component';

describe('StationSelectComponent', () => {
    let component: StationSelectComponent;
    let fixture: ComponentFixture<StationSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StationSelectComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StationSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

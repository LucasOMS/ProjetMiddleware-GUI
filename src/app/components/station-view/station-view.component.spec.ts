import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StationViewComponent} from './station-view.component';

describe('StationViewComponent', () => {
    let component: StationViewComponent;
    let fixture: ComponentFixture<StationViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StationViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

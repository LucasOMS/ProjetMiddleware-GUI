import {ComponentFixture, TestBed} from "@angular/core/testing";

import {LoginComponent} from "./login.component";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../models/user";
import {FormsModule} from "@angular/forms";
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from "@angular/material";
import {UserService} from "../../../services/user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {

    describe('LoginComponent DOM', function () {
        let component: LoginComponent;
        let fixture: ComponentFixture<LoginComponent>;
        let userServiceSpy;
        beforeEach(function () {
            userServiceSpy = jasmine.createSpyObj('UserService', ['tryConnect', 'getLoggedUser']);
            TestBed.configureTestingModule({
                declarations: [LoginComponent],
                imports: [
                    FormsModule,
                    // Replace with a material module, to long to play the import game for every component
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatCardModule,
                    BrowserAnimationsModule,
                ],
                providers: [
                    {provide: UserService, useValue: userServiceSpy}
                ]
            });
            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
        });

        it('Should Create', function () {
            expect(component).toBeDefined();
        });
        it('Should ask for a email and password', function () {
            const rootElement: HTMLElement = fixture.nativeElement;
            expect(rootElement.querySelector('input[placeholder="Email"]')).toBeDefined();
            expect(rootElement.querySelector('input[placeholder="Mot de passe"]')).toBeDefined();
        });
        it('Should check for email', function () {
            const rootElement: HTMLElement = fixture.nativeElement;
            const validate: HTMLElement = rootElement.querySelector('.connectButton');
            expect(rootElement.querySelectorAll('mat-error').length).toBe(0);
            validate.click();
            fixture.detectChanges();
            expect(rootElement.querySelectorAll('mat-error').length).toBe(2);
        });
    });

    describe('LoginComponent Class', function () {
        it('should attempt to connect and subscribe to updates', function () {
            const userServiceSpy = jasmine.createSpyObj('UserService', ['tryConnect', 'getLoggedUser']);
            const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
            const loginComponent = new LoginComponent(userServiceSpy, routerSpy);
            userServiceSpy.getLoggedUser.and.returnValue(new BehaviorSubject(null));
            loginComponent.ngOnInit();
            loginComponent.connect();
            expect(userServiceSpy.tryConnect.calls.count()).toBe(1);
            expect(userServiceSpy.tryConnect.calls.mostRecent().args[0]).toEqual(jasmine.any(User));
            expect(userServiceSpy.getLoggedUser.calls.count()).toBe(1);
        });
    });


});

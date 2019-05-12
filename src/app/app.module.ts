import {NgModule} from "@angular/core";
import {AppComponent} from "./components/app/app.component";
import {RegistrationComponent} from "./components/user-components/registration/registration.component";
import {LoginComponent} from "./components/user-components/login/login.component";
import {ProfileComponent} from "./components/user-components/profile/profile.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule
} from "@angular/material";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireStorageModule} from "angularfire2/storage";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./routes";
import {UserService} from "./services/user.service";
import {UsersListComponent} from "./components/user-components/users-list/users-list.component";
import {HomeComponent} from './components/home/home.component';
import {VelibService} from "./services/velib.service";
import {StationSelectComponent} from './components/station-select/station-select.component';
import {StationViewComponent} from './components/station-view/station-view.component';
import {MonitoringComponent} from './components/monitoring/monitoring.component';
import {MonitoringService} from "./services/monitoring.service";

@NgModule({

    declarations: [
        AppComponent,
        RegistrationComponent,
        UsersListComponent,
        LoginComponent,
        ProfileComponent,
        HomeComponent,
        StationSelectComponent,
        StationViewComponent,
        MonitoringComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,

        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [UserService, VelibService, MonitoringService, AngularFireAuth, MatIconRegistry],
    bootstrap: [AppComponent]
})
export class AppModule {
}

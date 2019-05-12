import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/user-components/profile/profile.component";
import {RegistrationComponent} from "./components/user-components/registration/registration.component";
import {LoginComponent} from "./components/user-components/login/login.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {MonitoringComponent} from './components/monitoring/monitoring.component';


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "profile", component: ProfileComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "login", component: LoginComponent},
    {path: "monitoring", component: MonitoringComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
}

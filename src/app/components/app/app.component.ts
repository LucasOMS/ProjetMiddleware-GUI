import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {VelibService} from "../../services/velib.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    readonly title;
    connectedUser: User;
    /**
     * Menu items with name and route to go to
     */
    menuItems: [string, string][];

    mobileMenuOpened: boolean;

    isLogged = false;

    constructor(private userService: UserService, private router: Router, private velibService: VelibService) {
        this.title = "Tiglib";
        this.mobileMenuOpened = false;
        this.menuItems = [
            // Complete entries for menus there
        ];
    }

    async ngOnInit() {

        this.connectedUser = await this.userService.getLoggedUser();
        if (this.connectedUser !== null) {
            this.isLogged = true;
        }

        (await this.userService.streamLoggedUser()).subscribe(user => {
            if (user === null && this.connectedUser !== null) {
                // Disconnect from user
                this.isLogged = false;
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigate(['/']);
            }
            this.connectedUser = user;
        });

    }

    disconnect() {
        this.userService.disconnectUser();
    }
}

import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userToConnect: User;
    hidePwd: boolean;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.hidePwd = true;
        this.userToConnect = new User('', '', '', '', '', '');
    }

    connect() {
        this.userService.tryConnect(this.userToConnect).then(async () => {
            const user = await this.userService.getLoggedUser();
            if (user !== null) {
                this.router.navigate(['/']).then(() => {
                });
            }
        });
    }

}

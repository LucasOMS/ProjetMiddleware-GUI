import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    /**
     * Used as a placeholder
     */
    defaultImageUrl = 'assets/user_placeholder.png';
    user: User = null;
    url = this.defaultImageUrl;

    firstName = '';
    lastName = '';
    mail = '';

    constructor(private userService: UserService, private snackBar: MatSnackBar) {
    }

    async ngOnInit() {
        this.user = await this.userService.getLoggedUser();
        if (this.user !== null) {
            this.firstName = this.user.firstName;
            this.lastName = this.user.lastName;
            this.mail = this.user.mail;
            if (this.user.photoUrl !== '' && this.user.photoUrl !== null) {
                if (isNullOrUndefined(this.user.downloadPhotoUrl)) {
                    // this.userService.getDownloadUrl(this.user.photoUrl).subscribe(link => {
                    //     this.url = link;
                    //     this.user.downloadPhotoUrl = link;
                    // });
                    this.user.downloadPhotoUrl = await this.userService.getDownloadUrl(this.user.photoUrl);
                    this.url = this.user.downloadPhotoUrl;
                } else {
                    this.url = this.user.downloadPhotoUrl;
                }
            }
        }
    }

    getUrl() {
        return {
            'background-image': 'url(\'' + this.url + '\')'
        };
    }

    submitChanges() {
        const promises = [];
        if (this.user.firstName !== this.firstName) {
            promises.push(this.userService.updateFirstName(this.user, this.firstName));
        }
        if (this.user.lastName !== this.lastName) {
            promises.push(this.userService.updateLastName(this.user, this.lastName));
        }
        if (this.user.mail !== this.mail) {
            promises.push(UserService.updateMailOfConnectedUser(this.mail));
        }

        Promise.all(promises).then(() => {
            this.user.firstName = this.firstName;
            this.user.lastName = this.lastName;
            this.user.mail = this.mail;
            this.snackBar.open('Les modifications ont bien été prises en compte.', null, {
                duration: 2500,
            });
        });
    }
}

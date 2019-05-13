import {Component, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    formControlPwdConfirm: FormControl;
    formControlPwd: FormControl;
    formControlMail: FormControl;


    constructor(private userService: UserService, private router: Router) {
    }

    private _userToRegister: User;

    get userToRegister(): User {
        return this._userToRegister;
    }

    ngOnInit() {
        this._userToRegister = new User('', '', '', '', '');
        this.formControlMail = new FormControl('', [Validators.required, Validators.email]);
        this.formControlPwdConfirm = new FormControl('', [Validators.required]);
        this.formControlPwd = new FormControl('', [Validators.required]);
    }

    /**
     * Used to validate form
     */
    validate() {
        this.fromInputsToUser();

        if (!User.hasValidMail(this.userToRegister)
            || !User.hasValidPassword(this.userToRegister)
            || this.formControlPwd.value !== this.formControlPwdConfirm.value
            || !User.hasValidFirstAndLastName(this.userToRegister)) {
            return;
        } else {
            // register User in Firebase
            this.userService.registerUser(this.userToRegister).then(() => {
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigate(['/']);
            }).catch(error => {
                console.error(error);
                this.formControlMail.setErrors({
                    badMail: true
                });
            });
        }
    }

    getMailError(): string {
        return this.formControlMail.hasError('required') ? 'Vous devez entrer une valeur' :
            this.formControlMail.hasError('badMail') ? 'Ceci n\'est pas une adresse valide ou est déjà prise'
                : 'Ceci n\'est pas une adresse valide';
    }

    getPwdConfirmError(): string {
        return this.formControlPwdConfirm.hasError('required') ? 'Vous devez entrer une valeur' :
            this.formControlPwdConfirm.hasError('tooShort') ? 'Ce mot de passe est trop court' :
                this.formControlPwdConfirm.hasError('doesntMatch') ? 'Les mots de passes ne correspondent pas' : '';
    }

    getPwdError(): string {
        return this.formControlPwd.hasError('required') ? 'Vous devez entrer une valeur' :
            this.formControlPwd.hasError('tooShort') ? 'Ce mot de passe est trop court' :
                this.formControlPwd.hasError('doesntMatch') ? 'Les mots de passes ne correspondent pas' : '';
    }

    // region Input errors
    checkPwdConfirm() {
        if (this.formControlPwdConfirm.value !== this.formControlPwd.value) {
            this.formControlPwdConfirm.setErrors({
                doesntMatch: true
            });
        } else if (this.formControlPwdConfirm.value.toString().length < 5) {
            this.formControlPwdConfirm.setErrors({
                tooShort: true
            });
        } else if (this.formControlPwdConfirm.value !== '') {
            this.formControlPwdConfirm.setErrors(null);
        }
    }

    checkPwd() {
        if (this.formControlPwd.value !== this.formControlPwdConfirm.value) {
            this.formControlPwd.setErrors({
                doesntMatch: true
            });
        } else if (this.formControlPwd.value.toString().length < 5) {
            this.formControlPwd.setErrors({
                tooShort: true
            });
        } else if (this.formControlPwd.value !== '') {
            this.formControlPwd.setErrors(null);
        }
    }

    // endregion

    private fromInputsToUser(): void {
        this.userToRegister.mail = this.formControlMail.value;
        this.userToRegister.password = this.formControlPwd.value;
    }
}

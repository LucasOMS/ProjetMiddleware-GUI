import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import * as firebase from "firebase";
import {isNullOrUndefined} from "util";

export class User {
    private readonly _idPlayer: string;

    /**
     * @param firstName
     * @param lastName
     * @param mail
     * @param photoUrl
     * @param userId
     * @param idPlayer
     */
    constructor(firstName: string,
                lastName: string,
                mail: string,
                photoUrl: string,
                userId: string,
                idPlayer: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._mail = mail;
        this._photoUrl = photoUrl;
        this._userId = userId;
        this._idPlayer = idPlayer;
    }

    private _downloadPhotoUrl: string;

    get downloadPhotoUrl(): string {
        return this._downloadPhotoUrl;
    }

    set downloadPhotoUrl(value: string) {
        this._downloadPhotoUrl = value;
    }

    private _subscriptions: string[];

    get subscriptions(): string[] {
        return this._subscriptions;
    }

    set subscriptions(value: string[]) {
        this._subscriptions = value;
    }

    get idPlayer(): string {
        return this._idPlayer;
    }

    private _state: UserState;

    get state(): UserState {
        return this._state;
    }

    set state(value: UserState) {
        this._state = value;
    }

    private _firstName: string;

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    private _lastName: string;

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    private _photoUrl: string;

    get photoUrl(): string {
        return this._photoUrl;
    }

    set photoUrl(value: string) {
        this._photoUrl = value;
    }

    private _canPublishAs: string[];
    get canPublishAs(): string[] {
        return this._canPublishAs;
    }

    private _roles: string[];

    get roles(): string[] {
        return this._roles;
    }

    set roles(value: string[]) {
        this._roles = value;
    }

    private _reports: Map<string, number>;


    get reports(): Map<string, number> {
        return this._reports;
    }

    set reports(value: Map<string, number>) {
        this._reports = value;
    }

    private _userId: string;

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    private _mail: string;

    get mail(): string {
        return this._mail;
    }

    set mail(value: string) {
        this._mail = value;
    }

    private _password: string;

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }


    static hasValidMail(user: User): boolean {
        return user.mail.includes('@', 0);
    }

    static hasValidPassword(user: User): boolean {
        return user.password.length >= 5;
    }

    static hasValidFirstAndLastName(user: User): boolean {
        return user.firstName.length > 2 && user.lastName.length > 2;
    }

    static fromDB(res: DocumentSnapshot): User {
        const user = this.fromJSON(res.data());
        if (isNullOrUndefined(user.userId) || user.userId === '') {
            user.userId = res.id;
        }
        return user;
    }

    static fromJSON(doc): User {
        const user = new User(doc.firstName, doc.lastName, doc.mail, doc.photoUrl, doc.userId, doc.idPlayer);
        if (!isNullOrUndefined(doc.state)) {
            user.state = doc.state;
        }
        if (!isNullOrUndefined(doc.subscriptions)) {
            user.subscriptions = doc.subscriptions;
        } else {
            user.subscriptions = [];
        }
        // if (doc.reports !== undefined) {
        //     const fromJsonToMap = new Map();
        //     for (const k of Object.keys(doc.reports)) {
        //         fromJsonToMap.set(k, doc.reports[k]);
        //     }
        //     user.reports = fromJsonToMap;
        // }
        return user;
    }

    supplyWithFirebaseUser(fUser: firebase.User): void {
        this.userId = fUser.uid;
        this.mail = fUser.email;
        if (isNullOrUndefined(this.photoUrl)) {
            this.photoUrl = fUser.photoURL;
        }
    }
}

export enum UserState {
    BANNED = -2,
    SUSPENDED,
    INNACTIVE,
    REDEMPT,
    DEAD,
    ALIVE
}

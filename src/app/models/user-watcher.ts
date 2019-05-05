import {User} from "./user";
import {AsyncSubject, BehaviorSubject} from "rxjs";

export class UserWatcher {

    private hasBeenSet = false;
    private readonly _user: BehaviorSubject<User>;

    private readonly pendingGet: AsyncSubject<User>[];
    private readonly pendingStream: AsyncSubject<BehaviorSubject<User>>[];

    constructor() {
        this._user = new BehaviorSubject<User>(null);
        this.pendingGet = [];
        this.pendingStream = [];
    }

    public updateUser(user: User) {
        if (this.hasBeenSet) {
            this._user.next(user);
        } else {
            this.initUser(user);
        }
    }

    public async getUser(): Promise<User> {
        if (this.hasBeenSet) {
            return Promise.resolve(this._user.getValue());
        } else {
            const futureUser = new AsyncSubject<User>();
            this.pendingGet.push(futureUser);
            return futureUser.toPromise();
        }
    }

    public async streamUser(): Promise<BehaviorSubject<User>> {
        if (this.hasBeenSet) {
            return Promise.resolve(this._user);
        } else {
            const futureStream = new AsyncSubject<BehaviorSubject<User>>();
            this.pendingStream.push(futureStream);
            return futureStream.toPromise();
        }
    }

    private initUser(user: User) {
        this._user.next(user);
        this.hasBeenSet = true;
        for (const pending of this.pendingGet) {
            pending.next(user);
            pending.complete();
        }
        for (const pending of this.pendingStream) {
            pending.next(this._user);
            pending.complete();
        }

    }

}

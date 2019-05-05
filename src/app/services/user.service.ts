import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireStorage} from "angularfire2/storage";
import {User} from "../models/user";
import {BehaviorSubject} from "rxjs";
import * as firebase from "firebase";
import {firestore} from "firebase";
import {Observable} from "rxjs-compat/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserWatcher} from "../models/user-watcher";
import UserCredential = firebase.auth.UserCredential;

const httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
};

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class UserService {

    private readonly loggedUser: UserWatcher;


    constructor(private st: AngularFireStorage, private db: AngularFirestore, private http: HttpClient) {
        this.loggedUser = new UserWatcher();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.getLoggedUserFromCache();
            }
        });
    }

    /**
     * Get firebase user is usefull to update thing such as password or to have his official display name
     *
     * @returns {firebase.User} User registered in firebase
     */
    static getLoggedFirebaseUser(): firebase.User {
        return firebase.auth().currentUser;
    }

    static updateMailOfConnectedUser(mail: string) {
        const toUpdate = UserService.getLoggedFirebaseUser();
        return toUpdate.updateEmail(mail);
    }

    /**
     * Use this function to register the user in firebase
     * Will automatically register the user in your Users collection as well
     *
     * @param {User} user to register, you have to set user.mail and user.password
     * @returns {Promise<UserCredential>}
     */
    public registerUser(user: User): Promise<void> {
        return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.mail, user.password)
            .then(res => {
                // register user in database when registered on firebase
                return this.registerUserInDatabase(user, res.user.uid);
            });
    }

    /**
     * You have to subscribe to this to use the logged in User
     *
     * If you intend to display this, you may have to use {@link ChangeDetectorRef}
     * and ChangeDetectorRef.detectChanges() in the subscribe method
     *
     * @returns {BehaviorSubject<User>} null if the user isn't logged in, a User otherwise
     */
    public async streamLoggedUser(): Promise<BehaviorSubject<User>> {
        return await this.loggedUser.streamUser();
    }

    public async getLoggedUser(): Promise<User> {
        return this.loggedUser.getUser();
    }

    /**
     * Try to connect the User
     * Set the persistence of the data so you won't have to reconnect later manually
     *
     * @param {User} userToConnect, the mail and password must have been set
     * @returns Promise<void> to listen when user is connected then redirect him
     */
    tryConnect(userToConnect: User): Promise<void> {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(userToConnect.mail, userToConnect.password).then(() => {
                    const docRef = this.db.collection('Users').doc(UserService.getLoggedFirebaseUser().uid).ref;
                    return docRef.get().then((doc) => {
                        const user = User.fromDB(doc);
                        user.supplyWithFirebaseUser(firebase.auth().currentUser);
                        this.loggedUser.updateUser(user);
                    });
                });
            })
            .catch(() => {
                // Handle Errors here.
                console.error('Error while connecting');
            });
    }

    /**
     * Disconnect the user and clear cache
     */
    disconnectUser() {
        firebase.auth().signOut().then(() => {
            // Signout successful
            this.loggedUser.updateUser(null);
        });
    }

    /**
     * Get the photo URL used to display it
     *
     * @param {string} photoUrl
     * @returns {Observable<string>}
     */
    getDownloadUrl(photoUrl: string): Promise<string> {
        return this.st.ref(photoUrl).getDownloadURL().toPromise();
    }

    /**
     * get all users
     *
     * @returns {Promise<User[]>}
     */
    async getUsers(): Promise<User[]> {
        const result = [];
        const usersSnap = await firestore().collection('Users').get();
        usersSnap.forEach(user => {
            result.push(User.fromDB(user));
        });
        return result;
    }

    updateFirstName(user: User, firstName: string) {
        return this.db.collection('Users').doc(user.userId).update({
            'firstName': firstName
        });
    }

    updateLastName(user: User, lastName: string) {
        return this.db.collection('Users').doc(user.userId).update({
            'lastName': lastName
        });
    }

    private updateLastConnection(userId: string) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.db.collection('Users').doc(userId).update({
            lastConnection: timestamp,
        }).catch(error => {
            console.error('From userService.updateLastConnection : ' + error.toString());
        });
    }

    private getLoggedUserFromCache() {
        const docRef = this.db.collection('Users').doc(UserService.getLoggedFirebaseUser().uid).ref;
        docRef.get().then((doc) => {
            const user = User.fromDB(doc);
            user.supplyWithFirebaseUser(UserService.getLoggedFirebaseUser());
            this.loggedUser.updateUser(user);
            this.updateLastConnection(user.userId);
        });
    }

    private registerUserInDatabase(user: User, uid: string): Promise<void> {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        return this.db.collection('Users').doc(uid).ref.set({
            mail: user.mail,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            lastConnection: timestamp,
            registrationDate: timestamp,
        });
    }
}

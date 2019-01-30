import { Injectable, NgZone } from "@angular/core";
import { User } from "../../model/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // TODO: Are both of these needed? If so rename to currentUser
  user: User;
  user$: Observable<User>;
  users$: BehaviorSubject<User[]>;
  users: User[] = [];
  localStorageUserKey = "colabCountersUser";
  userCollection: AngularFirestoreCollection<User>;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.userCollection = db.collection<User>("users");
    this.angularFireAuth.authState.subscribe(userData => {
      if (userData) {
        this.user = new User(userData);
        this.user$ = of(this.user);
        this.initializeUserService();
        this.setLocalStorageUser(this.user);
      } else {
        this.setLocalStorageUser(null);
      }
    });
  }

  initializeUserService() {
    if (!this.users$) {
      this.users$ = <BehaviorSubject<User[]>>(
        new BehaviorSubject(new Array<User>())
      );

      this.userCollection.valueChanges().subscribe(userValueChanges => {
        this.users = userValueChanges;
        this.users$.next(userValueChanges);
      });
    }
  }

  subscribeToUserService(): Observable<User[]> {
    return this.users$.asObservable();
  }

  getLocalStorageUser(): User {
    return JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }

  setLocalStorageUser(user: User) {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
  }

  removeLocalStorageUser() {
    localStorage.removeItem(this.localStorageUserKey);
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.finishLogin(result);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async signUp(email: string, password: string) {
    try {
      const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendVerificationEmail();
      this.setUserData(new User(result.user));
    } catch (error) {
      window.alert(error.message);
    }
  }

  sendVerificationEmail() {
    this.angularFireAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(["verify-email-address"]);
  }

  forgotPassword(passwordResetEmail: string) {
    try {
      this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      return { message: "Reset email successfully sent" };
    } catch (error) {
      window.alert(error);
      return { error: error };
    }
  }

  get isLoggedIn(): boolean {
    const user: User = this.getLocalStorageUser();
    return user !== null && user.emailVerified !== false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.angularFireAuth.auth.signInWithPopup(provider);
      this.finishLogin(result);
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        console.log(error);
      }
    }
  }

  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.userId}`
    );
    const userData: User = {
      userId: user.userId,
      emailAddress: user.emailAddress,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      activeCreatedCounters: user.activeCreatedCounters
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
    this.removeLocalStorageUser();
    this.router.navigate(["sign-in"]);
  }

  finishLogin(result: firebase.auth.UserCredential) {
    this.setUserData(new User(result.user));
    this.ngZone.run(() => {
      this.router.navigate(["dashboard"]);
    });
  }

  updateCountersCreated(userId: string, update: Partial<User>) {
    this.userCollection.doc(userId).update(update);
  }

  changeActiveCreatedCounters(userId: string, change: number) {
    const userDocRef = this.db.firestore.collection("users").doc(userId);

    return this.db.firestore.runTransaction(async transaction => {
      return transaction
        .get(userDocRef)
        .then(userDoc => {
          const newCount = userDoc.data().activeCreatedCounters + change;
          transaction.update(userDocRef, { activeCreatedCounters: newCount });
        })
        .then(() => {
          // Transaction successful
        })
        .catch(error => {
          console.log("Transaction failed: ", error);
        });
    });
  }
}

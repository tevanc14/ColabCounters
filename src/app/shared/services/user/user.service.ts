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

@Injectable({
  providedIn: "root"
})
export class UserService {
  userData: firebase.User;
  localStorageUserKey = "user";
  users: Array<any> = [];

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.setLocalStorageUser(this.userData);
      } else {
        this.setLocalStorageUser(null);
      }
    });
    this.getUsers();
  }

  getLocalStorageUser(): firebase.User {
    return JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }

  setLocalStorageUser(user: firebase.User) {
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
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async sendVerificationEmail() {
    await this.angularFireAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(["verify-email-address"]);
  }

  async forgotPassword(passwordResetEmail: string): Promise<any> {
    try {
      await this.angularFireAuth.auth.sendPasswordResetEmail(
        passwordResetEmail
      );
      return { message: "Reset email successfully sent" };
    } catch (error) {
      window.alert(error);
      return { error: error };
    }
  }

  get isLoggedIn(): boolean {
    const user: firebase.User = this.getLocalStorageUser();
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
      window.alert(error);
    }
  }

  async setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async signOut() {
    await this.angularFireAuth.auth.signOut();
    this.removeLocalStorageUser();
    this.router.navigate(["sign-in"]);
  }

  async finishLogin(result: firebase.auth.UserCredential) {
    await this.setUserData(result.user);
    this.ngZone.run(() => {
      this.router.navigate(["dashboard"]);
    });
  }

  getUsers() {
    const userRef: AngularFirestoreCollection<
      any
    > = this.angularFirestore.collection("users");
    return userRef.valueChanges().forEach(user => {
      this.users = this.users.concat(user);
    });
  }
}

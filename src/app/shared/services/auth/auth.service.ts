import { Injectable, NgZone } from "@angular/core";
import { User } from "./../../model/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: firebase.User;
  localStorageUserKey = "user";

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.setLocalStorageUser(JSON.stringify(this.userData));
      } else {
        this.setLocalStorageUser(null);
      }
    });
  }

  getLocalStorageUser(): firebase.User {
    return JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }

  setLocalStorageUser(user: string) {
    localStorage.setItem(this.localStorageUserKey, user);
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
}

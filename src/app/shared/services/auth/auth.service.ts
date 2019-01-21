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
  userData: any;
  localStorageUserKey = "user";

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.setLocalStorageUser(JSON.stringify(this.userData));
        this.getLocalStorageUser();
      } else {
        this.setLocalStorageUser(null);
        this.getLocalStorageUser();
      }
    });
  }

  getLocalStorageUser() {
    JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }

  setLocalStorageUser(user: string) {
    localStorage.setItem(this.localStorageUserKey, user);
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.ngZone.run(() => {
        this.router.navigate(["dashboard"]);
      });
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
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
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(["verify-email-address"]);
  }

  async forgotPassword(passwordResetEmail: string): Promise<any> {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      return { message: "Reset email successfully sent" };
    } catch (error) {
      window.alert(error);
      return { error: error };
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(["dashboard"]);
      });
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
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
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    this.router.navigate(["sign-in"]);
  }
}

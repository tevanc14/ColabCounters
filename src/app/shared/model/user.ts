export class User {
  public userId: string;
  public emailAddress: string;
  public displayName: string;
  public photoURL: string;
  public emailVerified: boolean;
  public activeCreatedCounters: number;

  constructor(firebaseUser: firebase.User) {
    this.userId = firebaseUser.uid;
    this.emailAddress = firebaseUser.email;
    this.displayName = firebaseUser.displayName;
    this.photoURL = firebaseUser.photoURL;
    this.emailVerified = firebaseUser.emailVerified;
    this.activeCreatedCounters = 0;
  }
}

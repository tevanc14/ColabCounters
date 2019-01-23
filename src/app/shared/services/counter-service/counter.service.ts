import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Counter, Collaborator, CounterStatus } from "./../../model/counter";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { firestore } from "firebase/app";

@Injectable()
export class CounterService {
  counterCollection: AngularFirestoreCollection<Counter>;
  counters: Observable<any>;
  user: firebase.User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    angularFireAuth.authState.subscribe(userData => {
      if (userData) {
        this.user = userData;
        this.counterCollection = db.collection<Counter>("counters", ref =>
          ref.orderBy("name")
        );
        this.counters = this.getCounters();
      }
    });
  }

  getCounters() {
    return this.counterCollection.valueChanges().pipe(
      map(counters => {
        return counters.filter(counter => {
          return this.checkCollaborators(counter.collaborators);
        });
      })
    );
  }

  checkCollaborators(collaborators: Array<Collaborator>): boolean {
    for (const collaborator of collaborators) {
      if (collaborator.userId === this.user.uid) {
        return true;
      }
    }
    return false;
  }

  addCounter(name: string) {
    const id: string = this.db.createId();
    const counter = this.buildDefaultCounter(name, id);
    this.counterCollection.doc(id).set(JSON.parse(JSON.stringify(counter)));
  }

  buildDefaultCounter(name: string, id: string) {
    return new Counter(
      id,
      name,
      0,
      [],
      new Date(),
      [new Collaborator(this.user.uid, true, true, true, true)],
      CounterStatus.ACTIVE,
      this.user.uid
    );
  }

  updateCounter(id: string, update: Partial<Counter>) {
    this.counterCollection.doc(id).update(update);
  }

  deleteCounter(counterId: string) {
    const counterDoc: AngularFirestoreDocument<Counter> = this.db.doc<Counter>(
      `counters/${counterId}`
    );

    counterDoc.delete();
  }

  addCollaborator(counterId: string, collaborator: Collaborator) {
    this.db.doc(`counters/${counterId}`).update({
      collaborators: firestore.FieldValue.arrayUnion(
        Object.assign({}, collaborator)
      )
    });
  }
}

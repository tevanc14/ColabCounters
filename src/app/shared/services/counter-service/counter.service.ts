import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Counter } from "./../../model/counter";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable()
export class CounterService {
  collectionEndpoint: string;
  counterCollection: AngularFirestoreCollection<Counter>;
  counters: Observable<any>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    angularFireAuth.authState.subscribe(userData => {
      if (userData) {
        this.collectionEndpoint = this.buildCollectionEndpoint(userData);
        this.counterCollection = db.collection<Counter>(
          this.collectionEndpoint,
          ref => ref.orderBy("name")
        );
        this.counters = this.getCounters();
      }
    });
  }

  buildCollectionEndpoint(userData: firebase.User) {
    const pathStrings = ["users", userData.uid, "counters"];
    return pathStrings.join("/");
  }

  getCounters() {
    return this.counterCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Counter;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addCounter(name: string) {
    const id = this.db.createId();
    const counter = new Counter(id, name, 0, [], new Date());
    this.counterCollection.doc(id).set(Object.assign({}, counter));
  }

  updateCounter(id: string, update: Partial<Counter>) {
    this.counterCollection.doc(id).update(update);
  }

  deleteCounter(counterId: string) {
    const counterDoc: AngularFirestoreDocument<Counter> = this.db.doc<Counter>(
      `${this.collectionEndpoint}/${counterId}`
    );

    counterDoc.delete();
  }
}

import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { config } from "./../../../app.config";
import { Counter } from "./../../model/counter";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class CounterService {
  collectionEndpoint: string;
  counters: AngularFirestoreCollection<Counter>;

  constructor(private db: AngularFirestore, public authService: AuthService) {
    this.collectionEndpoint = this.buildCollectionEndpoint();
    this.counters = db.collection<Counter>(this.collectionEndpoint);
  }

  buildCollectionEndpoint() {
    const pathStrings = ["users", this.authService.userData.uid, "counters"];
    return pathStrings.join("/");
  }

  getCounters() {
    return this.counters.snapshotChanges().pipe(
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
    const counter = new Counter(id, name, 0, []);
    this.counters.doc(id).set(Object.assign({}, counter));
  }

  updateCounter(id: string, update: Partial<Counter>) {
    this.counters.doc(id).update(update);
  }

  deleteCounter(counterId: string) {
    const counterDoc: AngularFirestoreDocument<Counter> = this.db.doc<Counter>(
      `${this.collectionEndpoint}/${counterId}`
    );

    counterDoc.delete();
  }
}

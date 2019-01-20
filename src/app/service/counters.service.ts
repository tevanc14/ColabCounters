import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { config } from "./../app.config";
import { Counter, Count } from "../model/counter";
import { map } from "rxjs/operators";

@Injectable()
export class CountersService {
  counters: AngularFirestoreCollection<Counter>;
  private counterDoc: AngularFirestoreDocument<Counter>;

  constructor(private db: AngularFirestore) {
    this.counters = db.collection<Counter>(config.collectionEndpoint);
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

  deleteCounter(id: string) {
    this.counterDoc = this.db.doc<Counter>(
      `${config.collectionEndpoint}/${id}`
    );

    this.counterDoc.delete();
  }
}

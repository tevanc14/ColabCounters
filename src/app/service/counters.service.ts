import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "@angular/fire/firestore";

import { config } from "./../app.config";
import { Counter } from "../model/counter";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class CountersService {
  counters: AngularFirestoreCollection<Counter>;
  private CounterDoc: AngularFirestoreDocument<Counter>;

  constructor(private db: AngularFirestore) {
    this.counters = db.collection<Counter>(config.collection_endpoint);
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

  addCounter(counter: Counter) {
    this.counters.add(counter);
  }

  updateCounter(id: string, update: Partial<Counter>) {
    this.counters.doc(id).update(update);
  }

  deleteCounter(id) {
    this.CounterDoc = this.db.doc<Counter>(
      `${config.collection_endpoint}/${id}`
    );

    this.CounterDoc.delete();
  }
}

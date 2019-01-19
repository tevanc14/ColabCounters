import { Component } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Counter } from "./counters/counter";
import { config } from "./app.config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  db: AngularFirestore;
  counters: Observable<Counter[]>;
  countersCollection: AngularFirestoreCollection<Counter>;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.countersCollection = db.collection(config.collection_endpoint);
    this.counters = this.countersCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Counter;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  increment(id) {
    console.log(id);
  }
}

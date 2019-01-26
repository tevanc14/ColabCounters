import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Counter, Collaborator, CounterStatus } from "./../../model/counter";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { firestore } from "firebase/app";
import { UserService } from "../user/user.service";

@Injectable()
export class CounterService {
  counterCollection: AngularFirestoreCollection<Counter>;
  counters$: Observable<any>;

  constructor(private db: AngularFirestore, public userService: UserService) {
    this.counterCollection = db.collection<Counter>("counters", ref =>
      ref.orderBy("name")
    );
    this.counters$ = this.getCounters();
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
      if (collaborator.userId === this.userService.user.userId) {
        return true;
      }
    }
    return false;
  }

  addCounter(name: string) {
    if (this.userService.user.activeCreatedCounters < 10) {
      const id: string = this.db.createId();
      const counter = this.buildDefaultCounter(name, id);
      this.counterCollection.doc(id).set(JSON.parse(JSON.stringify(counter)));
      this.userService.changeActiveCreatedCounters(counter.createdBy, 1);
    }
  }

  buildDefaultCounter(name: string, counterId: string) {
    const now = new Date();
    return new Counter(
      counterId,
      name,
      0,
      [],
      now,
      [new Collaborator(this.userService.user.userId, true, true, true)],
      CounterStatus.ACTIVE,
      this.userService.user.userId,
      now
    );
  }

  updateCounter(counterId: string, update: Partial<Counter>) {
    this.counterCollection.doc(counterId).update(update);
  }

  deleteCounter(counter: Counter) {
    const counterDoc: AngularFirestoreDocument<Counter> = this.db.doc<Counter>(
      `counters/${counter.counterId}`
    );

    counterDoc.delete();
    this.userService.changeActiveCreatedCounters(counter.createdBy, -1);
  }

  addCollaborator(counterId: string, collaborator: Collaborator) {
    this.db.doc(`counters/${counterId}`).update({
      collaborators: firestore.FieldValue.arrayUnion(
        Object.assign({}, collaborator)
      )
    });
  }

  updateCountersCreated(userId: string, activeCreatedCounters: number) {
    console.log(userId, activeCreatedCounters);
    this.userService.updateCountersCreated(userId, {
      activeCreatedCounters: activeCreatedCounters
    });
  }
}

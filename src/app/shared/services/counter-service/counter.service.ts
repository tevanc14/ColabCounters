import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Counter, Collaborator, CounterStatus } from "./../../model/counter";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { firestore } from "firebase/app";
import { UserService } from "../user/user.service";

@Injectable()
export class CounterService {
  private sortType = new BehaviorSubject("name");
  sortType$ = this.sortType.asObservable();

  counterCollection: AngularFirestoreCollection<Counter>;
  counters$: Observable<Counter[]>;

  constructor(private db: AngularFirestore, public userService: UserService) {
    this.counterCollection = db.collection<Counter>("counters");
    this.sortType$.subscribe((sortType: SortType) => {
      this.counters$ = this.getCounters(sortType);
    });
  }

  changeSortType(sortType: SortType) {
    this.sortType.next(sortType);
  }

  getCounters(sortType: SortType): Observable<Counter[]> {
    return this.counterCollection.valueChanges().pipe(
      map(counters => {
        return counters
          .filter((counter: Counter) => {
            return this.checkCollaborators(counter.collaborators);
          })
          .sort((a: Counter, b: Counter) => {
            if (a[sortType] < b[sortType]) {
              return -1;
            } else if (a[sortType] > b[sortType]) {
              return 1;
            } else {
              return 0;
            }
          });
      })
    );
  }

  checkCollaborators(collaborators: Collaborator[]): boolean {
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
      [new Collaborator(this.userService.user.userId, true, true, true, true)],
      CounterStatus.Active,
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

  removeCollaborator(counterId: string, collaborator: Collaborator) {
    this.db.doc(`counters/${counterId}`).update({
      collaborators: firestore.FieldValue.arrayRemove(
        Object.assign({}, collaborator)
      )
    });
  }

  updateCollaborator(
    counterId: string,
    oldCollaborator: Collaborator,
    newCollaborator: Collaborator
  ) {
    this.removeCollaborator(counterId, oldCollaborator);
    this.addCollaborator(counterId, newCollaborator);
  }

  updateCountersCreated(userId: string, activeCreatedCounters: number) {
    this.userService.updateCountersCreated(userId, {
      activeCreatedCounters: activeCreatedCounters
    });
  }
}

export enum SortType {
  Name = "name",
  DateCreated = "dateCreated",
  LastModified = "lastModified",
  TotalCount = "totalCount"
}

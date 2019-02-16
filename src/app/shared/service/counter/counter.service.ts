import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { firestore } from "firebase/app";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  Collaborator,
  Counter,
  CounterStatus
} from "src/app/shared/model/counter";
import { UserService } from "src/app/shared/service/user/user.service";

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

  changeSortType(sortType: SortType): void {
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
      if (collaborator.userId === this.userService.currentUser.userId) {
        return true;
      }
    }
    return false;
  }

  addCounter(name: string): void {
    if (this.userService.currentUser.activeCreatedCounters <= 10) {
      const id: string = this.db.createId();
      const counter = this.buildDefaultCounter(name, id);
      this.counterCollection.doc(id).set(JSON.parse(JSON.stringify(counter)));
      this.userService.changeActiveCreatedCounters(counter.createdBy, 1);
    }
  }

  buildDefaultCounter(name: string, counterId: string): Counter {
    const now = new Date();
    return new Counter(
      counterId,
      name,
      0,
      [],
      now,
      [
        new Collaborator(
          this.userService.currentUser.userId,
          true,
          true,
          true,
          true
        )
      ],
      CounterStatus.Active,
      this.userService.currentUser.userId,
      now
    );
  }

  updateCounter(counterId: string, update: Partial<Counter>): void {
    this.counterCollection.doc(counterId).update(update);
  }

  deleteCounter(counter: Counter): void {
    const counterDoc: AngularFirestoreDocument<Counter> = this.db.doc<Counter>(
      `counters/${counter.counterId}`
    );

    counterDoc.delete();
    this.userService.changeActiveCreatedCounters(counter.createdBy, -1);
  }

  addCollaborator(counterId: string, collaborator: Collaborator): void {
    this.db.doc(`counters/${counterId}`).update({
      collaborators: firestore.FieldValue.arrayUnion(
        Object.assign({}, collaborator)
      )
    });
  }

  removeCollaborator(counterId: string, collaborator: Collaborator): void {
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
  ): void {
    this.removeCollaborator(counterId, oldCollaborator);
    this.addCollaborator(counterId, newCollaborator);
  }

  updateCountersCreated(userId: string, activeCreatedCounters: number): void {
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

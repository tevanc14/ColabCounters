import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class TitleVisibilityService {
  private titleVisibility = new BehaviorSubject(true);
  titleVisibility$ = this.titleVisibility.asObservable();

  constructor() {}

  changeVisibility(visibility: boolean) {
    this.titleVisibility.next(visibility);
  }
}

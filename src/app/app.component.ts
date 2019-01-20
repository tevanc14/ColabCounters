import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Counter } from "./model/counter";
import { CountersService } from "./service/counters.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  counters: Observable<Counter[]>;

  constructor(
    private countersService: CountersService
  ) {
    this.counters = this.countersService.getCounters();
  }
}

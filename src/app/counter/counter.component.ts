import { Component, OnInit, Input } from "@angular/core";
import { Counter } from "../model/counter";
import { CountersService } from "../service/counters.service";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"]
})
export class CounterComponent implements OnInit {
  @Input() counter: Counter;

  constructor(private countersService: CountersService) {}

  ngOnInit() {}

  increment(counter: Counter) {
    const incrementedCount = counter.currentCount + 1;
    this.updateCurrentCount(counter.id, incrementedCount);
  }

  decrement(counter: Counter) {
    const decrementedCount = counter.currentCount - 1;
    this.updateCurrentCount(counter.id, decrementedCount);
  }

  updateCurrentCount(id: string, newCount: number) {
    this.countersService.updateCounter(id, { currentCount: newCount });
  }

  mouseOver() {}
}

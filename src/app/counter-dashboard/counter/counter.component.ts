import { Component, OnInit, Input } from "@angular/core";
import { Counter, Count, CountType } from "../../shared/model/counter";
import { CounterService } from "./../../shared/services/counter-service/counter.service";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"]
})
export class CounterComponent implements OnInit {
  @Input() counter: Counter;

  constructor(private countersService: CounterService) {}

  ngOnInit() {}

  increment(counter: Counter) {
    const incrementedCount = counter.totalCount + 1;
    this.updateTotalCount(incrementedCount, counter, CountType.INCREMENT);
  }

  decrement(counter: Counter) {
    if (counter.totalCount > 0) {
      const decrementedCount = counter.totalCount - 1;
      this.updateTotalCount(decrementedCount, counter, CountType.DECREMENT);
    }
  }

  updateTotalCount(newCount: number, counter: Counter, countType: CountType) {
    const now = new Date();
    counter.counts.push(Object.assign({}, new Count(newCount, countType, now)));
    const update = {
      totalCount: newCount,
      counts: counter.counts,
      lastModified: now
    };
    this.countersService.updateCounter(counter.id, update);
  }

  delete(counter: Counter) {
    this.countersService.deleteCounter(counter.id);
  }
}

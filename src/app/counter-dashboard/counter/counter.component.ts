import { Component, OnInit, Input } from "@angular/core";
import { Counter, Count, CountType } from "./../counter";
import { CounterService } from "./../counter-service/counter.service";

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
    counter.counts.push(
      Object.assign({}, new Count(newCount, countType, new Date()))
    );
    const update = { totalCount: newCount, counts: counter.counts };
    this.countersService.updateCounter(counter.id, update);
  }

  delete(counter: Counter) {
    this.countersService.deleteCounter(counter.id);
  }
}

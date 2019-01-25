import { Component, OnInit, Input } from "@angular/core";
import { Counter, Count, CountType } from "../../shared/model/counter";
import { CounterService } from "./../../shared/services/counter-service/counter.service";
import { MatDialog } from "@angular/material";
import { CounterDetailsDialogComponent } from "./counter-details-dialog/counter-details-dialog.component";
import { CollaboratorDialogComponent } from "./collaborator-dialog/collaborator-dialog.component";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"]
})
export class CounterComponent implements OnInit {
  @Input() counter: Counter;

  constructor(
    private counterService: CounterService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

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
    counter.counts.push(
      Object.assign(
        {},
        new Count(newCount, countType, now, this.userService.user.userId)
      )
    );
    const update = {
      totalCount: newCount,
      counts: counter.counts,
      lastModified: now
    };
    this.counterService.updateCounter(counter.counterId, update);
  }

  delete(counter: Counter) {
    this.counterService.deleteCounter(counter);
  }

  openDetailsDialog() {
    this.dialog.open(CounterDetailsDialogComponent, {
      data: { counter: this.counter }
    });
  }

  openCollaboratorDialog() {
    this.dialog.open(CollaboratorDialogComponent, {
      data: { counter: this.counter }
    });
  }

  createdByCurrentUser() {
    return this.counter.createdBy === this.userService.user.userId;
  }
}

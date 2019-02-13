import { Component, OnInit, Input } from "@angular/core";
import {
  Counter,
  Count,
  CountType,
  Collaborator
} from "../../shared/model/counter";
import { CounterService } from "./../../shared/services/counter-service/counter.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { CounterDetailsDialogComponent } from "./counter-details-dialog/counter-details-dialog.component";
import { CollaboratorDialogComponent } from "./collaborator-dialog/collaborator-dialog.component";
import { UserService } from "src/app/shared/services/user/user.service";
import { TitleVisibilityService } from "src/app/shared/services/title-visibility/title-visibility.service";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog/confirm-delete-dialog.component";
import { CounterNameDialogComponent } from "../counter-name-dialog/counter-name-dialog.component";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"]
})
export class CounterComponent implements OnInit {
  @Input() counter: Counter;
  titleVisibility: boolean;
  collaborator: Collaborator;

  constructor(
    private counterService: CounterService,
    private userService: UserService,
    private titleVisibilityService: TitleVisibilityService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.titleVisibilityService.titleVisibility$.subscribe(
      (titleVisibility: boolean) => {
        this.titleVisibility = titleVisibility;
      }
    );

    this.collaborator = this.counter.collaborators.find(
      (collaborator: Collaborator) => {
        return collaborator.userId === this.userService.user.userId;
      }
    );
  }

  increment(counter: Counter) {
    const incrementedCount = counter.totalCount + 1;
    this.updateTotalCount(incrementedCount, counter, CountType.Increment);
  }

  decrement(counter: Counter) {
    if (counter.totalCount > 0) {
      const decrementedCount = counter.totalCount - 1;
      this.updateTotalCount(decrementedCount, counter, CountType.Decrement);
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

  delete() {
    this.counterService.deleteCounter(this.counter);
  }

  openConfirmDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { counter: this.counter }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete();
        this.snackBar.open(
          `The "${this.counter.name}" counter was deleted`,
          "Close",
          { duration: 5000 }
        );
      }
    });
  }

  openDetailsDialog() {
    this.dialog.open(CounterDetailsDialogComponent, {
      data: { counter: this.counter }
    });
  }

  openCollaboratorDialog() {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      data: { counter: this.counter }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.snackBar.open(result, "Close", { duration: 5000 });
    });
  }

  openEditNameDialog() {
    const dialogRef = this.dialog.open(CounterNameDialogComponent, {
      data: { title: "Edit counter name" }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.counterService.updateCounter(this.counter.counterId, {
          name: result
        });
      }
    });
  }

  canWrite() {
    return this.collaborator.canWrite;
  }

  canShare() {
    return this.collaborator.canShare;
  }

  canDelete() {
    return this.collaborator.canDelete;
  }
}

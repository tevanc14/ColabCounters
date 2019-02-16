import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { CounterNameDialogComponent } from "src/app/counter-dashboard/counter-name-dialog/counter-name-dialog.component";
import { CollaboratorDialogComponent } from "src/app/counter-dashboard/counter/collaborator-dialog/collaborator-dialog.component";
import { ConfirmDeleteDialogComponent } from "src/app/counter-dashboard/counter/confirm-delete-dialog/confirm-delete-dialog.component";
import { CounterDetailsDialogComponent } from "src/app/counter-dashboard/counter/counter-details-dialog/counter-details-dialog.component";
import {
  Collaborator,
  Count,
  Counter,
  CountType
} from "src/app/shared/model/counter";
import { CounterService } from "src/app/shared/service/counter/counter.service";
import { TitleVisibilityService } from "src/app/shared/service/title-visibility/title-visibility.service";
import { UserService } from "src/app/shared/service/user/user.service";

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

  ngOnInit(): void {
    this.titleVisibilityService.titleVisibility$.subscribe(
      (titleVisibility: boolean) => {
        this.titleVisibility = titleVisibility;
      }
    );

    this.collaborator = this.counter.collaborators.find(
      (collaborator: Collaborator) => {
        return collaborator.userId === this.userService.currentUser.userId;
      }
    );
  }

  increment(counter: Counter): void {
    const incrementedCount = counter.totalCount + 1;
    this.updateTotalCount(incrementedCount, counter, CountType.Increment);
  }

  decrement(counter: Counter): void {
    if (counter.totalCount > 0) {
      const decrementedCount = counter.totalCount - 1;
      this.updateTotalCount(decrementedCount, counter, CountType.Decrement);
    }
  }

  updateTotalCount(
    newCount: number,
    counter: Counter,
    countType: CountType
  ): void {
    const now = new Date();
    counter.counts.push(
      Object.assign(
        {},
        new Count(newCount, countType, now, this.userService.currentUser.userId)
      )
    );
    const update = {
      totalCount: newCount,
      counts: counter.counts,
      lastModified: now
    };
    this.counterService.updateCounter(counter.counterId, update);
  }

  delete(): void {
    this.counterService.deleteCounter(this.counter);
  }

  openConfirmDeleteDialog(): void {
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

  openDetailsDialog(): void {
    this.dialog.open(CounterDetailsDialogComponent, {
      data: { counter: this.counter }
    });
  }

  openCollaboratorDialog(): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      data: { counter: this.counter }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.snackBar.open(result, "Close", { duration: 5000 });
      }
    });
  }

  openEditNameDialog(): void {
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

  canWrite(): boolean {
    return this.collaborator.canWrite;
  }

  canShare(): boolean {
    return this.collaborator.canShare;
  }

  canDelete(): boolean {
    return this.collaborator.canDelete;
  }
}

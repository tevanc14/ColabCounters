import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CounterNameDialogComponent } from "src/app/counter-dashboard/counter-name-dialog/counter-name-dialog.component";
import { CounterService } from "src/app/shared/service/counter/counter.service";

@Component({
  selector: "app-counter-dashboard",
  templateUrl: "./counter-dashboard.component.html",
  styleUrls: ["./counter-dashboard.component.scss"]
})
export class CounterDashboardComponent implements OnInit {
  newCounterName: string;

  constructor(
    public counterService: CounterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openCreateCounterDialog(): void {
    const dialogRef = this.dialog.open(CounterNameDialogComponent, {
      data: { title: "New counter name" }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.counterService.addCounter(result);
      }
    });
  }
}

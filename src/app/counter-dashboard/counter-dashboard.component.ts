import { Component, OnInit } from "@angular/core";
import { CounterService } from "./../shared/services/counter-service/counter.service";
import { MatDialog } from "@angular/material";
import { CounterNameDialogComponent } from "./counter-name-dialog/counter-name-dialog.component";

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

  ngOnInit() {}

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

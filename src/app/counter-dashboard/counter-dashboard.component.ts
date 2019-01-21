import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Counter } from "../shared/model/counter";
import { CounterService } from "./../shared/services/counter-service/counter.service";
import { MatDialog } from "@angular/material";
import { CreateCounterDialogComponent } from "./create-counter-dialog/create-counter-dialog.component";

@Component({
  selector: "app-counter-dashboard",
  templateUrl: "./counter-dashboard.component.html",
  styleUrls: ["./counter-dashboard.component.scss"]
})
export class CounterDashboardComponent implements OnInit {
  counters: Observable<Counter[]>;
  newCounterName: string;

  constructor(
    private countersService: CounterService,
    private dialog: MatDialog
  ) {
    this.counters = this.countersService.getCounters();
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCounterDialogComponent, {
      data: { newCounterName: this.newCounterName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countersService.addCounter(result);
      }
    });
  }
}

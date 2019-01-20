import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Counter } from "./model/counter";
import { CountersService } from "./service/counters.service";
import { MatDialog } from "@angular/material";
import { CounterDialogComponent } from "./counter-dialog/counter-dialog.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  counters: Observable<Counter[]>;
  newCounterName: string;

  constructor(
    private countersService: CountersService,
    private dialog: MatDialog
  ) {
    this.counters = this.countersService.getCounters();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CounterDialogComponent, {
      data: { newCounterName: this.newCounterName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countersService.addCounter(result);
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { CounterService } from "./../shared/services/counter-service/counter.service";
import { MatDialog } from "@angular/material";
import { CreateCounterDialogComponent } from "./create-counter-dialog/create-counter-dialog.component";

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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCounterDialogComponent, {
      data: { newCounterName: this.newCounterName },
      height: "210px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.counterService.addCounter(result);
      }
    });
  }
}

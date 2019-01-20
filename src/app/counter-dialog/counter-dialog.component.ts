import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

export interface DialogData {
  newCounterName: string;
}

@Component({
  selector: "app-counter-dialog",
  templateUrl: "./counter-dialog.component.html",
  styleUrls: ["./counter-dialog.component.scss"]
})
export class CounterDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CounterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}

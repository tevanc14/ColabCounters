import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Counter } from "src/app/shared/model/counter";

export interface DialogData {
  counter: Counter;
}

@Component({
  selector: "app-confirm-delete-dialog",
  templateUrl: "./confirm-delete-dialog.component.html",
  styleUrls: ["./confirm-delete-dialog.component.scss"]
})
export class ConfirmDeleteDialogComponent implements OnInit {
  counter: Counter;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.counter = data.counter;
  }

  ngOnInit(): void {}
}

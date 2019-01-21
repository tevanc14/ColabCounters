import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

export interface DialogData {
  newCounterName: string;
}
@Component({
  selector: "app-create-counter-dialog",
  templateUrl: "./create-counter-dialog.component.html",
  styleUrls: ["./create-counter-dialog.component.scss"]
})
export class CreateCounterDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateCounterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}

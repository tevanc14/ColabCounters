import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  title: string;
}

@Component({
  selector: "app-counter-name-dialog",
  templateUrl: "./counter-name-dialog.component.html",
  styleUrls: ["./counter-name-dialog.component.scss"]
})
export class CounterNameDialogComponent implements OnInit {
  title: string;
  counterName = new FormControl("", [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<CounterNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    if (!this.counterName.invalid) {
      this.dialogRef.close(this.counterName.value);
    }
  }

  getErrorMessage(): string {
    return "Must enter a value";
  }
}

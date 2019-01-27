import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-create-counter-dialog",
  templateUrl: "./create-counter-dialog.component.html",
  styleUrls: ["./create-counter-dialog.component.scss"]
})
export class CreateCounterDialogComponent implements OnInit {
  counterName = new FormControl("", [Validators.required]);

  constructor(public dialogRef: MatDialogRef<CreateCounterDialogComponent>) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }

  create() {
    if (!this.counterName.invalid) {
      this.dialogRef.close(this.counterName.value);
    }
  }

  getErrorMessage(): string {
    return "Must enter a value";
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"]
})
export class VerifyEmailComponent implements OnInit {
  constructor(public authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  resendVerificationEmail() {
    this.snackBar.open("Verification email sent", "Close", {
      duration: 5000
    });
  }
}

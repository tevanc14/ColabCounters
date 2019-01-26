import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss", "./../shared-auth.scss"]
})
export class VerifyEmailComponent implements OnInit {
  constructor(public userService: UserService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  resendVerificationEmail() {
    this.snackBar.open("Verification email sent", "Close", {
      duration: 5000
    });
  }

  isSendingVerificationEmail(): boolean {
    return this.userService.user && !this.userService.user.emailVerified;
  }
}

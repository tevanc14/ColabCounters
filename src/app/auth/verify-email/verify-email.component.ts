import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/shared/service/user/user.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss", "./../shared-auth.scss"]
})
export class VerifyEmailComponent implements OnInit {
  constructor(public userService: UserService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  resendVerificationEmail(): void {
    this.snackBar.open("Verification email sent", "Close", {
      duration: 5000
    });
  }

  isSendingVerificationEmail(): boolean {
    return (
      this.userService.currentUser &&
      !this.userService.currentUser.emailVerified
    );
  }
}

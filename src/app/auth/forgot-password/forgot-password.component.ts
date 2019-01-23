import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  emailAddress: string;

  constructor(public userService: UserService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  async resetPassword() {
    const emailStatus = await this.userService.forgotPassword(
      this.emailAddress
    );
    if (!emailStatus.error) {
      this.snackBar.open("Password reset email sent", "Close", {
        duration: 5000
      });
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/shared/service/user/user.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss", "./../shared-auth.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  emailAddress: string;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async resetPassword(): Promise<void> {
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

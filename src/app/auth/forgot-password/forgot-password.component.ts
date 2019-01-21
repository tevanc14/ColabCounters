import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  emailAddress: string;

  constructor(public authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  async resetPassword() {
    const emailStatus = await this.authService.forgotPassword(
      this.emailAddress
    );
    if (!emailStatus.error) {
      this.snackBar.open("Password reset email sent", "Close", {
        duration: 5000
      });
    }
  }
}

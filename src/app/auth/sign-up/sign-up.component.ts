import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/shared/service/user/user.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss", "./../shared-auth.scss"]
})
export class SignUpComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  emailSignUp(): void {
    this.userService.signUp(this.emailAddress, this.password).catch(error => {
      console.error(error);
      this.snackBar.open(error.message, "Close", { duration: 5000 });
    });
  }
}

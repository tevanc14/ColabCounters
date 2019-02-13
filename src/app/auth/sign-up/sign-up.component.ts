import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss", "./../shared-auth.scss"]
})
export class SignUpComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  emailSignUp() {
    this.userService.signUp(this.emailAddress, this.password).catch(error => {
      console.error(error);
      this.snackBar.open(error.message, "Close", { duration: 5000 });
    });
  }
}

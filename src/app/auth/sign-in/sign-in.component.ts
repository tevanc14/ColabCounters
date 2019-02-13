import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss", "./../shared-auth.scss"]
})
export class SignInComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  emailSignIn() {
    this.userService.signIn(this.emailAddress, this.password).catch(error => {
      console.error(error);
      this.snackBar.open(error.message, "Close", { duration: 5000 });
    });
  }
}

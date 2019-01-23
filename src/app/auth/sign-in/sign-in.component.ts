import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public userService: UserService) {}

  ngOnInit() {}

  emailSignIn() {
    this.userService.signIn(this.emailAddress, this.password);
  }
}

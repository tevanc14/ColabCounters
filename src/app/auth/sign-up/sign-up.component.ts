import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public userService: UserService) {}

  ngOnInit() {}

  emailSignUp() {
    this.userService.signUp(this.emailAddress, this.password);
  }
}

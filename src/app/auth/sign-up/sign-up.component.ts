import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  emailSignUp() {
    this.authService.signUp(this.emailAddress, this.password);
  }
}

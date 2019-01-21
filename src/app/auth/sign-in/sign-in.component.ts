import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  emailAddress: string;
  password: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  emailSignIn() {
    this.authService.signIn(this.emailAddress, this.password);
  }
}

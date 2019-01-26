import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";
import { User } from "src/app/shared/model/user";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  title = "Colab Counters";

  constructor(public userService: UserService) {}

  ngOnInit() {}

  hasUserPhoto(user: User) {
    return user.photoURL === null;
  }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  title = "Counters";

  constructor(public userService: UserService) {}

  ngOnInit() {}
}

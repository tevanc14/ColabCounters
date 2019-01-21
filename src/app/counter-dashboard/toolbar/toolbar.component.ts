import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  title = "Counters";

  constructor(public authService: AuthService) {}

  ngOnInit() {}
}

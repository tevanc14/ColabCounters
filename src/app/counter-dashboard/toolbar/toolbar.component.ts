import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user/user.service";
import { User } from "src/app/shared/model/user";
import { TitleVisibilityService } from "src/app/shared/services/title-visibility/title-visibility.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  title = "Colab Counters";
  titleVisibility: boolean;

  constructor(
    public userService: UserService,
    private titleVisibilityService: TitleVisibilityService
  ) {}

  ngOnInit() {
    this.titleVisibilityService.titleVisibility$.subscribe(
      (titleVisibility: boolean) => {
        this.titleVisibility = titleVisibility;
      }
    );
  }

  hasUserPhoto(user: User) {
    return user.photoURL !== null;
  }

  setTitleVisibility(visibility: boolean) {
    this.titleVisibilityService.changeVisibility(visibility);
  }
}

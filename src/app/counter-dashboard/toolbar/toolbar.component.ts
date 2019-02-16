import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/model/user";
import {
  CounterService,
  SortType
} from "src/app/shared/service/counter/counter.service";
import { TitleVisibilityService } from "src/app/shared/service/title-visibility/title-visibility.service";
import { UserService } from "src/app/shared/service/user/user.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  public sortTypeEnum = SortType;
  public title = "Colab Counters";
  public titleVisibility: boolean;

  constructor(
    public userService: UserService,
    private counterService: CounterService,
    private titleVisibilityService: TitleVisibilityService
  ) {}

  ngOnInit(): void {
    this.titleVisibilityService.titleVisibility$.subscribe(
      (titleVisibility: boolean) => {
        this.titleVisibility = titleVisibility;
      }
    );
  }

  hasUserPhoto(user: User): boolean {
    return user.photoURL !== null;
  }

  setTitleVisibility(visibility: boolean): void {
    this.titleVisibilityService.changeVisibility(visibility);
  }

  changeCounterSortType(sortType: SortType): void {
    this.counterService.changeSortType(sortType);
  }
}

import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { UserService } from "./../services/user/user.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isLoggedIn) {
      window.alert("You are not allowed to access this URL!");
      this.router.navigate(["dashboard"]);
    }
    return true;
  }
}

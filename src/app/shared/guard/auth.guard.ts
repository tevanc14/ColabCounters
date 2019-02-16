import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/shared/service/user/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isLoggedIn !== true) {
      this.router.navigate(["sign-in"]);
    }
    return true;
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { CounterDashboardComponent } from "./counter-dashboard/counter-dashboard.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";

import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: "", redirectTo: "/sign-in", pathMatch: "full" },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "register-user",
    component: SignUpComponent
  },
  {
    path: "dashboard",
    component: CounterDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent,
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

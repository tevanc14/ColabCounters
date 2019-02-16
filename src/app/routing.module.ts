import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ForgotPasswordComponent } from "src/app/auth/forgot-password/forgot-password.component";
import { SignInComponent } from "src/app/auth/sign-in/sign-in.component";
import { SignUpComponent } from "src/app/auth/sign-up/sign-up.component";
import { VerifyEmailComponent } from "src/app/auth/verify-email/verify-email.component";
import { CounterDashboardComponent } from "src/app/counter-dashboard/counter-dashboard.component";
import { AuthGuard } from "src/app/shared/guard/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
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
    component: ForgotPasswordComponent
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

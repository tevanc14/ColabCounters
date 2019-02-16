import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";

import { MaterialModule } from "src/app/material.module";
import { AppRoutingModule } from "src/app/routing.module";
import { UserService } from "src/app/shared/service/user/user.service";
import { ForgotPasswordComponent } from "src/app/auth/forgot-password/forgot-password.component";
import { SignInComponent } from "src/app/auth/sign-in/sign-in.component";
import { SignUpComponent } from "src/app/auth/sign-up/sign-up.component";
import { VerifyEmailComponent } from "src/app/auth/verify-email/verify-email.component";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule
  ],
  providers: [UserService],
  exports: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ]
})
export class AuthModule {}

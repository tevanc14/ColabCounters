import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { AuthService } from "../shared/services/auth/auth.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule } from "@angular/forms";

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
  providers: [AuthService],
  exports: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ]
})
export class AuthModule {}

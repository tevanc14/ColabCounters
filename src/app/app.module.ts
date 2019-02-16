import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "src/app/app.component";
import { AuthModule } from "src/app/auth/auth.module";
import { CounterDashboardModule } from "src/app/counter-dashboard/counter-dashboard.module";
import { MaterialModule } from "src/app/material.module";
import { AppRoutingModule } from "src/app/routing.module";
import { UserService } from "src/app/shared/service/user/user.service";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    CounterDashboardModule,
    MaterialModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}

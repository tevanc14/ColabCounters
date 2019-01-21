import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { environment } from "src/environments/environment";
import { CounterDashboardModule } from "./counter-dashboard/counter-dashboard.module";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CounterDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

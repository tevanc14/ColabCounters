import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

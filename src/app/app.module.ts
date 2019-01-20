import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { CounterComponent } from "./counter/counter.component";
import { CountersService } from "./service/counters.service";
import { MaterialModule } from "./material.module";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule
  ],
  providers: [CountersService],
  bootstrap: [AppComponent]
})
export class AppModule {}

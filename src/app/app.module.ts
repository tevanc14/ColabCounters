import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { CounterComponent } from "./counter/counter.component";
import { CounterDialogComponent } from "./counter-dialog/counter-dialog.component";
import { CountersService } from "./service/counters.service";
import { MaterialModule } from "./material.module";
import { environment } from "src/environments/environment";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CounterComponent, CounterDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [CountersService],
  bootstrap: [AppComponent],
  entryComponents: [CounterDialogComponent]
})
export class AppModule {}

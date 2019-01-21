import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterComponent } from "./counter/counter.component";
import { CounterDashboardComponent } from "./counter-dashboard.component";
import { CounterService } from "./counter-service/counter.service";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { CreateCounterDialogComponent } from "./create-counter-dialog/create-counter-dialog.component";

@NgModule({
  declarations: [
    CounterComponent,
    CounterDashboardComponent,
    CreateCounterDialogComponent
  ],
  imports: [CommonModule, FlexLayoutModule, FormsModule, MaterialModule],
  exports: [CounterComponent, CounterDashboardComponent],
  providers: [CounterService],
  entryComponents: [CreateCounterDialogComponent]
})
export class CounterDashboardModule {}

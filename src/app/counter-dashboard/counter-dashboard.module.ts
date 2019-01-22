import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterComponent } from "./counter/counter.component";
import { CounterDashboardComponent } from "./counter-dashboard.component";
import { CounterService } from "./../shared/services/counter-service/counter.service";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { CreateCounterDialogComponent } from "./create-counter-dialog/create-counter-dialog.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { AppRoutingModule } from "../app-routing.module";
import { CounterDetailsDialogComponent } from "./counter-details-dialog/counter-details-dialog.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    CounterComponent,
    CounterDashboardComponent,
    CreateCounterDialogComponent,
    ToolbarComponent,
    CounterDetailsDialogComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    NgxChartsModule
  ],
  exports: [
    CounterComponent,
    CounterDashboardComponent,
    CreateCounterDialogComponent,
    ToolbarComponent
  ],
  providers: [CounterService],
  entryComponents: [CreateCounterDialogComponent, CounterDetailsDialogComponent]
})
export class CounterDashboardModule {}

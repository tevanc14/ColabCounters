import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterComponent } from "./counter/counter.component";
import { CounterDashboardComponent } from "./counter-dashboard.component";
import { CounterService } from "./../shared/services/counter-service/counter.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { CreateCounterDialogComponent } from "./create-counter-dialog/create-counter-dialog.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { AppRoutingModule } from "../app-routing.module";
import { CounterDetailsDialogComponent } from "./counter/counter-details-dialog/counter-details-dialog.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CollaboratorDialogComponent } from "./counter/collaborator-dialog/collaborator-dialog.component";
import { TitleVisibilityService } from "../shared/services/title-visibility/title-visibility.service";
import { ConfirmDeleteDialogComponent } from "./counter/confirm-delete-dialog/confirm-delete-dialog.component";

@NgModule({
  declarations: [
    CounterComponent,
    CounterDashboardComponent,
    CreateCounterDialogComponent,
    ToolbarComponent,
    CounterDetailsDialogComponent,
    CollaboratorDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CounterComponent,
    CounterDashboardComponent,
    CreateCounterDialogComponent,
    ToolbarComponent
  ],
  providers: [CounterService, TitleVisibilityService],
  entryComponents: [
    CreateCounterDialogComponent,
    CounterDetailsDialogComponent,
    CollaboratorDialogComponent,
    ConfirmDeleteDialogComponent
  ]
})
export class CounterDashboardModule {}

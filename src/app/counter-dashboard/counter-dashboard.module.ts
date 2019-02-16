import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CounterDashboardComponent } from "src/app/counter-dashboard/counter-dashboard.component";
import { CounterNameDialogComponent } from "src/app/counter-dashboard/counter-name-dialog/counter-name-dialog.component";
import { CollaboratorDialogComponent } from "src/app/counter-dashboard/counter/collaborator-dialog/collaborator-dialog.component";
import { ConfirmDeleteDialogComponent } from "src/app/counter-dashboard/counter/confirm-delete-dialog/confirm-delete-dialog.component";
import { CounterDetailsDialogComponent } from "src/app/counter-dashboard/counter/counter-details-dialog/counter-details-dialog.component";
import { CounterComponent } from "src/app/counter-dashboard/counter/counter.component";
import { ToolbarComponent } from "src/app/counter-dashboard/toolbar/toolbar.component";
import { MaterialModule } from "src/app/material.module";
import { AppRoutingModule } from "src/app/routing.module";
import { CounterService } from "src/app/shared/service/counter/counter.service";
import { TitleVisibilityService } from "src/app/shared/service/title-visibility/title-visibility.service";

@NgModule({
  declarations: [
    CounterComponent,
    CounterDashboardComponent,
    CounterNameDialogComponent,
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
    CounterNameDialogComponent,
    ToolbarComponent
  ],
  providers: [CounterService, TitleVisibilityService],
  entryComponents: [
    CounterNameDialogComponent,
    CounterDetailsDialogComponent,
    CollaboratorDialogComponent,
    ConfirmDeleteDialogComponent
  ]
})
export class CounterDashboardModule {}

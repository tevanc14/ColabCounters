import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
} from "@angular/material";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ]
})
export class MaterialModule {}

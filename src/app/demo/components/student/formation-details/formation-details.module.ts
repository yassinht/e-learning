import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationDetailsRoutingModule } from './formation-details-routing.module';
import { FormationDetailsComponent } from './formation-details/formation-details.component';


@NgModule({
  declarations: [
    FormationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormationDetailsRoutingModule
  ]
})
export class FormationDetailsModule { }

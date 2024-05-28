import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesAbonnementsRoutingModule } from './mes-abonnements-routing.module';
import { MesAbonnementsComponent } from './mes-abonnements/mes-abonnements.component';


@NgModule({
  declarations: [
    MesAbonnementsComponent
  ],
  imports: [
    CommonModule,
    MesAbonnementsRoutingModule
  ]
})
export class MesAbonnementsModule { }

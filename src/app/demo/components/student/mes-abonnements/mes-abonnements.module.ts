import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesAbonnementsRoutingModule } from './mes-abonnements-routing.module';
import { MesAbonnementsComponent } from './mes-abonnements/mes-abonnements.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    MesAbonnementsComponent
  ],
  imports: [
    CommonModule,
    MesAbonnementsRoutingModule,  DropdownModule, // Include DropdownModule
    ButtonModule // Include ButtonModule
  ]
})
export class MesAbonnementsModule { }

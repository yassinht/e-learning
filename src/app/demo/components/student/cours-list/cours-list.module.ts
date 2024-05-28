import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursListRoutingModule } from './cours-list-routing.module';
import { CoursListComponent } from './cours-list/cours-list.component';


@NgModule({
  declarations: [
    CoursListComponent
  ],
  imports: [
    CommonModule,
    CoursListRoutingModule
  ]
})
export class CoursListModule { }

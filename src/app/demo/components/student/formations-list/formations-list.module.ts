import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationsListRoutingModule } from './formations-list-routing.module';
import { FormationsListComponent } from './formations-list/formations-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    FormationsListComponent
  ],
  imports: [
    CommonModule,
    FormationsListRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,CardModule
    
  ]
})
export class FormationsListModule { }

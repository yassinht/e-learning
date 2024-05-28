import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuizRoutingModule } from './add-quiz-routing.module';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AddQuizComponent
  ],
  imports: [
    CommonModule,
    AddQuizRoutingModule, // PrimeNG Modules
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    DialogModule,DropdownModule,
    ToastModule
  ]
})
export class AddQuizModule { }

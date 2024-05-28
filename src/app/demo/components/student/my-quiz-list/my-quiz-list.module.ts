import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyQuizListRoutingModule } from './my-quiz-list-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';


@NgModule({
  declarations: [
    QuizListComponent
  ],
  imports: [
    CommonModule,
    MyQuizListRoutingModule
  ]
})
export class MyQuizListModule { }

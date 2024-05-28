import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherQuizzesComponent } from './teacher-quizzes/teacher-quizzes.component';

const routes: Routes = [
    {path:'',component:TeacherQuizzesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherQuizzesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdStudentComponent } from './ad-student/ad-student.component';

const routes: Routes = [
  {path:'',component:AdStudentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdStudentRoutingModule { }

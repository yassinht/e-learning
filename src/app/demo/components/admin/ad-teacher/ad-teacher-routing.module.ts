import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdTeacherComponent } from './ad-teacher/ad-teacher.component';

const routes: Routes = [
  {path:'',component:AdTeacherComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdTeacherRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursListComponent } from './cours-list/cours-list.component';

const routes: Routes = [
  {path:'',component:CoursListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursListRoutingModule { }

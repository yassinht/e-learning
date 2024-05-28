import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormationComponent } from './add-formation/add-formation.component';

const routes: Routes = [
  {path:'',component:AddFormationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }

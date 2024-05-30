import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationDetailsComponent } from './formation-details/formation-details.component';

const routes: Routes = [
  {path:'',component:FormationDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationDetailsRoutingModule { }

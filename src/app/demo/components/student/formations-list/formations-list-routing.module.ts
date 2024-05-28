import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationsListComponent } from './formations-list/formations-list.component';

const routes: Routes = [
  {path:'',component:FormationsListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationsListRoutingModule { }

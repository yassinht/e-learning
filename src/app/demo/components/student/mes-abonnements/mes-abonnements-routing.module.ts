import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesAbonnementsComponent } from './mes-abonnements/mes-abonnements.component';

const routes: Routes = [
  {path:'',component:MesAbonnementsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesAbonnementsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdCategoryComponent } from './ad-category/ad-category.component';

const routes: Routes = [
  {path:'',component:AdCategoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdCategoryRoutingModule { }

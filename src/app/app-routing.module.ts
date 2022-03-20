import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';



const routes: Routes = [
 { path : 'admin/category/view',component: CategoryCardComponent},
 { path : 'admin/category/new', component: NewCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

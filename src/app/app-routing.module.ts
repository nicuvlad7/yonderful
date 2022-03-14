import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCardComponent } from './components/category-card/category-card.component';


const routes: Routes = [
 {path: 'admin/category/${title}',component: CategoryCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

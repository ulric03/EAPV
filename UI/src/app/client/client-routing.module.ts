import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: CreateEditComponent },
  { path: 'edit/:id', component: CreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

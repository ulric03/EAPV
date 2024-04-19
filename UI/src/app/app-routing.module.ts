import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './client/list/list.component';

const routes: Routes = [
  { 
    path: 'client', 
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  { 
    path: '', component: ListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AuthActivate } from '../core/guards/auth.activate';

const routes: Routes = [
  {
    path: 'books',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainComponent,
      },
      {
        path: ':bookId',
        component: CurrentBookComponent
      },
      {
        path: 'edit/:bookId',
        component: EditBookComponent,
        canActivate: [AuthActivate]
      }
    ]
  },
  {
    path: 'add-book',
    component: NewBookComponent,
    canActivate: [AuthActivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}

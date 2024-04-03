import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentBookComponent } from './current-book/current-book.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule } from '@angular/forms';
import { EditBookComponent } from './edit-book/edit-book.component';



@NgModule({
  declarations: [
    CurrentBookComponent,
    NewBookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule
  ]
})
export class BookModule { }

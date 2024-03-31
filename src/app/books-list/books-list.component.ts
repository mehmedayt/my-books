import { Component, OnInit } from '@angular/core';
import { Book } from '../types/book';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksComponent implements OnInit {
  booksList: Book[] = [];
  isLoading: boolean = true;
  isEmpty = true;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLogged(): boolean{
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (books) => {
        this.booksList = books;
        if (this.booksList.length > 0) {
          this.isEmpty = false;
        }
        console.log(books);
        
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/types/book';
import { UserService } from '../user.service';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  booksList: Book[] = [];
  isLoading: boolean = true;
  isEmpty: boolean = true;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    let userData = localStorage.getItem('user');

    if (userData) {
      let user = JSON.parse(userData) as User;
      let id = user._id;

      this.apiService.getOwn(id).subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.booksList = response;
          } else {
            this.booksList = [response];
          }
          this.isEmpty = this.booksList.length === 0;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(`Error: ${err}`);
        },
      });
      
    }

    
  }
}

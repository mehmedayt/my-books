import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css'],
})
export class CurrentBookComponent implements OnInit {
  book: Book | undefined;
  totalLikes: number | undefined;
  isOwner: boolean | undefined;
  canLike: boolean | undefined;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.getLikes();
    this.fetchBook();
  }

  // fetchBook(): void {
  //   const id = this.activatedRoute.snapshot.params['bookId'];
  //   let user: any = localStorage.getItem('user');
  //   user = JSON.parse(user);

  //   this.apiService.getBook(id).subscribe((book) => {
  //     this.book = book;
  //     this.apiService.getOwnLikes(id, user?._id).pipe(
  //       map((result: any) => result == 0)
  //     ).subscribe((result: boolean) => {
  //       this.canLike = !this.isOwner && result;
  //       console.log(this.canLike);

  //     });
  //     this.isOwner = user && user._id == book._ownerId;
  //     console.log();
  //   });
  // }

  fetchBook(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

    this.apiService.getBook(id).subscribe((book) => {
      this.book = book;

      if (user) {
        const ownLikes$: Observable<Object> | undefined =
          this.apiService.getOwnLikes(id, user._id);

        if (ownLikes$) {
          ownLikes$
            .pipe(map((result: any) => result == 0))
            .subscribe((result: boolean) => {
              this.canLike = !this.isOwner && result;
            });
        } else {
          this.canLike = false;
        }

        this.isOwner = user && user._id == book._ownerId;
      } else {
        this.isOwner = false;
        this.canLike = false;
      }

    });
  }

  deleteBook(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];

    this.apiService.deleteBook(id).subscribe((book) => {
      this.router.navigate(['/']);
    });
  }

  likeBook(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];

    const like = {
      bookId: id,
    };

    this.apiService.likeBook(like).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getLikes(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];

    this.apiService.getLikes(id).subscribe((data) => {
      this.totalLikes = Number(data);
    });
  }
}

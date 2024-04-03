import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book: Book | undefined;
  selectedType: string | undefined;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBook();
  }

  fetchBook(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];

    this.apiService.getBook(id).subscribe((book) => {
      this.book = book;
      this.selectedType = this.book?.type;
    });
  }

  editBookSubmitHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const id = this.activatedRoute.snapshot.params['bookId'];

    const formData = form.value;
    const data = {
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      type: formData.type
    };

    this.apiService.editBook(id, data).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

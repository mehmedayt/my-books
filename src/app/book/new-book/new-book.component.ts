import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  o$ = new Observable();

  newBookSubmitHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    // console.log(form.value);

    const { title, description, imageUrl, type } = form.value;
    this.apiService.createBook(title, description, imageUrl, type).subscribe();
    this.router.navigate(['/']);
  }
}

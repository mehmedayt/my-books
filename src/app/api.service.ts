import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Book } from './types/book';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBooks() {
    const { appUrl } = environment;
    return this.http.get<Book[]>(
      `${appUrl}/data/books?sortBy=_createdOn%20desc`
    );
  }

}



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

  getBook(id: string) {
    const { appUrl } = environment;
    return this.http.get<Book>(`${appUrl}/data/books/${id}`);
  }

  getBooks() {
    const { appUrl } = environment;
    return this.http.get<Book[]>(
      `${appUrl}/data/books?sortBy=_createdOn%20desc`
    );
  }

  createBook(
    title: string,
    description: string,
    imageUrl: string,
    type: string
  ) {
    const { appUrl } = environment;
    let userData = localStorage.getItem('user');

    if (userData) {
      let accessToken = JSON.parse(userData).accessToken;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken || '',
      });

      const body = {
        title,
        description,
        imageUrl,
        type,
      };

      return this.http.post<Book>(`${appUrl}/data/books`, body, { headers });
    } else {
      return throwError('User data not found in localStorage');
    }
  }

  getOwn(id: string) {
    const { appUrl } = environment;

    return this.http.get<Book>(
      `${appUrl}/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`
    );
  }

  deleteBook(id: string) {
    const { appUrl } = environment;
    const userData = localStorage.getItem('user');

    if (userData) {
      const accessToken = JSON.parse(userData).accessToken;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken || '',
      });

      return this.http.delete<Book>(`${appUrl}/data/books/${id}`, { headers });
    } else {
      return throwError('User data not found in localStorage');
    }
  }

  editBook(id: string, data: object): Observable<Book> {
    const { appUrl } = environment;
    const userData = localStorage.getItem('user');
  
    if (userData) {
      const accessToken = JSON.parse(userData).accessToken;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken || '',
      });
      return this.http.put<Book>(`${appUrl}/data/books/${id}`, data, { headers });
    }
  
    throw new Error('User data not found in localStorage');
  }

  likeBook(id: object){
    const { appUrl } = environment;
    const userData = localStorage.getItem('user');
  
    if (userData) {
      const accessToken = JSON.parse(userData).accessToken;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken || '',
      });
      return this.http.post(`${appUrl}/data/likes`, id, {headers});
    }
     throw new Error('User data not found in localStorage');
  }

  getLikes(id: string){
    const { appUrl } = environment;
      return this.http.get(`${appUrl}/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
  }

  getOwnLikes(bookId: string, userId: string){
    const { appUrl } = environment;
    const userData = localStorage.getItem('user');
  
    if (userData) {
      const accessToken = JSON.parse(userData).accessToken;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken || '',
      });
      return this.http.get(`${appUrl}/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`, {headers});
    }
    return
  }
  
}



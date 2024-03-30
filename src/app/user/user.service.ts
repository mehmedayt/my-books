import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  get userData(): Observable<User | undefined> {
    return this.user$;
  }


  get isLogged(): boolean {
    const user = localStorage.getItem('user');
    if(user){
      return true;
    }else{
      return false;
    }
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>('http://localhost:3030/users/login', { email, password })
      .pipe(
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));

          this.user$$.next(user);
        })
      );
  }

  register(email: string, password: string, rePassword: string) {
    return this.http
      .post<User>('http://localhost:3030/users/register', {
        email,
        password,
        rePassword,
      })
      .pipe(
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));

          this.user$$.next(user);
        })
      );
  }

  logout() {
    return this.http.post<User>('http://localhost:3030/users/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('user')
        this.user$$.next(undefined);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

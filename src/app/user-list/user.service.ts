import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _http: HttpClient) {
    this.fetchUsers();
  }

  public get users$(): Observable<User[]> {
    return this._users$.asObservable();
  }

  private readonly _users$ = new BehaviorSubject<User[]>(
    []
  );

  fetchUsers(): void {
    this._http
      .get<User[]>(
        `https://jsonplaceholder.typicode.com/users`
      )
      .pipe(
        tap((users: User[]) => this._users$.next(users))
      )
      .subscribe();
  }
}

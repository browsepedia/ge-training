import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {
  Observable,
  combineLatest,
  debounceTime,
  map,
  startWith,
} from 'rxjs';
import { MarkPipe } from './mark.pipe';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MarkPipe,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class UserListComponent {
  constructor(private readonly _userService: UserService) {
    _userService.fetchUsers();

    const filter$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      map((searchValue: string) =>
        searchValue.toLowerCase()
      )
    );

    this.filteredUsers$ = combineLatest([
      filter$,
      this._userService.users$,
    ]).pipe(
      map(([searchValue, users]) =>
        users.filter((user) =>
          user.name.toLowerCase().includes(searchValue)
        )
      )
    );
  }

  protected filteredUsers$: Observable<User[]>;

  protected searchControl = new FormControl<string>('', {
    nonNullable: true,
  });
}

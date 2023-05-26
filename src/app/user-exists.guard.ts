import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';
import {
  Observable,
  filter,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { UserService } from './user-list/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserExistsGuard {
  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    const userId = route.params['userId'];

    if (!userId || isNaN(+userId)) {
      return of(false);
    }

    return this._userService.users$.pipe(
      filter((users) => users.length > 0),
      map((users) => {
        const userExists = !!users.find(
          (user) => user.id === +userId
        );

        if (!userExists) {
          this._router.navigateByUrl('/users');
        }

        return userExists;
      })
    );
  }
}

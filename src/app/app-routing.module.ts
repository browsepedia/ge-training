import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserExistsGuard } from './user-exists.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./user-list/user-list.component').then(
            (m) => m.UserListComponent
          ),
      },
      {
        path: 'users/:userId',
        canActivate: [UserExistsGuard],
        loadComponent: () =>
          import('./user-form/user-form.component').then(
            (m) => m.UserFormComponent
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./post-list/post-list.component').then(
            (m) => m.PostListComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}

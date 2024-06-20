import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../data/users/user.interface';
import { UsersService } from '../../data/users/users.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [AsyncPipe, UserFormComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);

  mode: 'view' | 'edit' = 'view';

  user = this.route.params.pipe(
    map((params) => {
      const user = this.usersService.getUserById(params['id']);
      return user;
    })
  );

  onDeleteBtnClick(userId: IUser['id']) {
    this.usersService.deleteUserById(userId);
    this.router.navigate(['']);
  }

  editUser(user: IUser) {
    this.usersService.editById(user.id, user);
    this.user = this.user.pipe(map(() => user));
    this.mode = 'view';
  }

  toEditMode() {
    this.mode = 'edit';
  }

  toViewMode() {
    this.mode = 'view';
  }
}
